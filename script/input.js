/* Imports for vue */
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import VueFire from 'vuefire';
import Firebase from 'firebase';

/* Config for firebase */
let config = {
  apiKey: "AIzaSyCE41CQIHdgCbQcfaPoIUJmuxcb5HZqXB8",
  authDomain: "portfolio-3f33e.firebaseapp.com",
  databaseURL: "https://portfolio-3f33e.firebaseio.com",
  projectId: "portfolio-3f33e",
  storageBucket: "portfolio-3f33e.appspot.com",
  messagingSenderId: "118457206765"
};

/* Initialise firebase */
let firebaseApp = Firebase.initializeApp(config);
/* get the firebase database */
let db = firebaseApp.database();

/* Contact database reference */
let contactRef = db.ref('contact');
/* Comments database reference */
let commentsRef = db.ref('comments');

/* Use veevalidate for form validation */
Vue.use(VeeValidate); 
/* Use vuefire for firebase integration */
Vue.use(VueFire);

/* Contact form component */
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

                  <input type="submit" value="send" v-on:click="submitForm" class="button">
              </form>`,
  data: function() {
    /* Contact form data */
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
      /* Prevent default submit button behaviour */
      e.preventDefault();
      /* Validate all fields */
      this.$validator.validateAll().then(res=>{
        /* if validates */
        if(res) {
          /* Push data to database */
          contactRef.push(this.newContact);
          /* Reset fields */
          this.newContact.email = '';
          this.newContact.name = '';
          this.newContact.message = '';
          /* Reset form validation, has to be called on next tick */
          this.$nextTick(() => {
            this.$validator.reset();
          });
          /* Add a success message to the form */
          document.getElementById('form_contact').innerHTML = '<div class="success">Successfully submitted!</div>' + document.getElementById('form_contact').innerHTML;
        } else {
          /* Did not validate */
          return;
        }
      });
    }
  },
  firebase: {
    users: contactRef
  }
});

/* Component reply box */
Vue.component('reply-box', {
  template: ` <div class="commentbox">
                <h5>Leave a comment</h5>      
                <input name="name" type="text" placeholder="your name" v-model="newComment.name" v-validate="{required: true, regex: /[A-z]+/}">
                <textarea name="comment" data-placeholder="true" v-model="newComment.message" v-validate="{required: true}">leave a comment</textarea>
                <div class="commentbox_controls">
                    <input type="submit" value="comment" v-on:click="submitComment" class="button">
                </div>
              </div>`,
  data: function() {
    /* Comment data */
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
      /* Prevent default submit button behaviour */
      e.preventDefault();
      /* Validate all fields */
      this.$validator.validateAll().then(res=>{
        /* If validates correctly */
        if(res) {
          /* push data to database */
          commentsRef.push(this.newComment);
          /* Reset fields */
          this.newComment.name = '';
          this.newComment.message = '';
          /* reset validator on next tick */
          this.$nextTick(() => {
            this.$validator.reset();
          });
        } else {
          /* validation failed, return */
          return;
        }
      });
    }
  },
  firebase: {
    users: commentsRef
  }
});

/* Component comments */
Vue.component('comments-box', {
  /* Loops through comments data, display it on the page */
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
  firebase: {
      comments: commentsRef
  }
});

new Vue({
  el: '#app'
});