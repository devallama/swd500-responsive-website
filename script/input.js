import Vue from 'vue';
import VeeValidate from 'vee-validate';
import VueFire from 'vuefire';
import Firebase from 'firebase';

let config = {
  apiKey: "AIzaSyCE41CQIHdgCbQcfaPoIUJmuxcb5HZqXB8",
  authDomain: "portfolio-3f33e.firebaseapp.com",
  databaseURL: "https://portfolio-3f33e.firebaseio.com",
  projectId: "portfolio-3f33e",
  storageBucket: "portfolio-3f33e.appspot.com",
  messagingSenderId: "118457206765"
};

let firebaseApp = Firebase.initializeApp(config);
let db = firebaseApp.database();

let contactRef = db.ref('contact');
let commentsRef = db.ref('comments');

Vue.use(VeeValidate); 
Vue.use(VueFire);

Vue.component('contact-form', {
  template: ` <form class="formcontainer" id="form_contact">
                  <label for="email">Email</label>
                  <input type="email" name="email" required v-model="newContact.email" v-validate="{required: true}" >
                  <span class="error" v-show="errors.has('email')">{{ errors.first('email') }}</span>

                  <label for="name">Name</label>
                  <input type="text" name="name" required v-model="newContact.name" v-validate="{required: true, regex: /[A-z]+/}">
                  <span class="error" v-show="errors.has('name')">{{ errors.first('name') }}</span>

                  <label for="message">Message</label>
                  <textarea name="message" required v-model="newContact.message" v-validate="{required: true}"></textarea>
                  <span class="error" v-show="errors.has('message')">{{ errors.first('message') }}</span>

                  <input type="submit" value="send" v-on:click="submitForm">
              </form>`,
  data: function() {
    return {
      newContact: {
        email: '',
        name: '',
        message: ''
      }
    };
  },
  methods: {
    submitForm: function(e) {
      e.preventDefault();
      this.$validator.validateAll().then(res=>{
        if(res) {
          contactRef.push(this.newContact);
          this.newContact.email = '';
          this.newContact.name = '';
          this.newContact.message = '';
          this.$nextTick(() => {
            this.$validator.reset();
          });
          document.getElementById('form_contact').innerHTML = '<div class="success">Successfully submitted!</div>' + document.getElementById('form_contact').innerHTML;
        } else {
          return;
        }
      });
    }
  },
  firebase: {
    users: contactRef
  }
});

Vue.component('reply-box', {
  template: ` <div class="commentbox">
                <h5>Leave a comment</h5>      
                <input name="name" type="text" placeholder="your name" v-model="newComment.name" v-validate="{required: true, regex: /[A-z]+/}">
                <textarea name="comment" data-placeholder="true" v-model="newComment.message" v-validate="{required: true}">leave a comment</textarea>
                <div class="commentbox_controls">
                    <input type="submit" value="comment" v-on:click="submitComment">
                </div>
              </div>`,
  data: function() {
    return {
      newComment: {
        name: '',
        time: new Date().toLocaleDateString('en-GB'),
        message: ''
      }
    };
  },
  methods: {
    submitComment: function(e) {
      e.preventDefault();
      this.$validator.validateAll().then(res=>{
        if(res) {
          console.log("called");
          commentsRef.push(this.newComment);
          this.newComment.name = '';
          this.newComment.message = '';
          this.$nextTick(() => {
            this.$validator.reset();
          });
        } else {
          return;
        }
      });
    }
  },
  firebase: {
    users: commentsRef
  }
});

Vue.component('comments', {
  template: `
    <div class="comments">
      <div class="comment_container" v-for="comment in comments">
        <div class="comment_top">
          <div class="comment_top_author">
            {{comment.name}}
          </div>
          <div class="comment_top_time">
            {{comment.time}}
          </div>
        </div>
        <div class="comment_content">
          <p>
            {{comment.message}}
          </p>
        </div>
      </div>
    </div>
  `,
  methods: {
      removeUser: function(comment) {
        commentsRef.child(comment['.key']).remove();
      }
  },
  firebase: {
      comments: commentsRef
  }
});

new Vue({
  el: '#app'
});