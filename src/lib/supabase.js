import { createClient } from '@supabase/supabase-js';

/**
  * Our database object is always going to be in this form.
  * I have a feeling that I might need to change the backend
  * at some point, so this will make that easier. It will
  * also allow for us to streamline the App state from where it's
  * at right now.
  * 
  * const database = {
  *   useSession: (callback) => () => {}, // callback args: 

  *   signIn: (callback) => (username, password) => {}, // callback args: 
  *   signUp: (callback) => (username, password) => {}, // callback args: 
  *   signOut: (callback) => () => {}, // callback args: { error }

  *   createTask: (callback) => (name) => {}, // callback args: 
  *   endTask: (callback) => () => {}, // callback args: 
  * };
  * 
  * It's important to note that it should be fine using the `createClient`
  * directly on the client-side. Security-wise it shouldn't pose any risks.
 */
export function supabase() {
  
  const supabase_instance = createClient("https://nbapvclgpvgnlmgiotne.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iYXB2Y2xncHZnbmxtZ2lvdG5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAzOTkyNzgsImV4cCI6MjAzNTk3NTI3OH0.g1H7kvzVubY5OFFxUo5OsxJd6L_mbYAz-rI6bzJG7-k");

  const getSession = async () => {

    const session = await supabase_instance.auth.getSession();
  
    return session;
  }
  
  const getCurrentTasks = async () => {
  
    const task = await supabase_instance.from('task_data').select('name, created_at').eq('current', true);
  
    return task;
  }

  this.user_id = null;

  this.useSession = (loading, callback) => {
    if(!loading)
      return;

    (async () => {
      const session = await getSession();
      const tasks = await getCurrentTasks();

      return { session, tasks };
      
    })().then((resp) => {
      if(!resp.session.error & resp?.session?.data?.session)
        this.user_id = resp.session.data.session.user.id;

      callback(resp);
    });
  };

  // set user_id
  this.signIn = (callback) => (email, password) => () => {
    supabase_instance.auth.signInWithPassword({
      email,
      password
    }).then((resp) => {
      if(!resp.error)
        this.user_id = resp.data.user.id;

      callback(resp);
    });
  };

  this.signUp = (callback) => (email, password) => () => {
    supabase_instance.auth.signUp({
      email,
      password
    }).then(callback);
  };

  // unset user_id
  this.signOut = (callback) => () => {
    supabase_instance.auth.signOut().then(({ error }) => {
      this.user_id = null;
      callback(error);
    });
  };

  this.createTask = (callback) => (name) => () => {
    supabase_instance.from('task_data').insert({ name, ended_at: null, user_id: this.user_id, current: true }).select().then(callback)
  };

  this.endTask = (callback) => (name) => () => {
    supabase_instance.from('task_data')
    .update({ ended_at: ((new Date()).toISOString()).toLocaleString('zh-TW'), current: false, user_id: this.user_id })
    .eq("name", name)
    .then(callback)
  };

  this.generateDownloadLink = (callback) => () => {
    supabase_instance.from('task_data').select().then(({data, error}) => {
      callback({ data: URL.createObjectURL(new Blob([JSON.stringify(data)])), error })
    })
  };

};
