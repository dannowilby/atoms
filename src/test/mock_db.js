
export function mockDB() {

  this.user_id = null;

  // need to handle the case where the session persists
  this.useSession = (loading, callback) => {
    if(!loading)
      return;

    const resp = {
        session: {
            data: {
                session: null
            },
            error: null
        },

        tasks: {
            data: null,
            error: { name: "AuthApiError" }
        } 
    };

    callback(resp);
  };

  // set user_id
  this.signIn = (callback) => (email, password) => () => {
    
    const payload= (email === process.env.test_email & password === process.env.test_password) ? { error: null } : { error: { name: "AuthApiError" }}

    callback(payload);
  };

  this.signUp = (callback) => (email, password) => () => {
    
  };

  // unset user_id
  this.signOut = (callback) => () => {
    this.user_id = null;

    callback({ error: null });
  };

  this.createTask = (callback) => (name) => () => {
    const data = { 
      data: [ { name, created_at: Date.now() }],
      error: null
    };

    callback(data)
  };

  this.endTask = (callback) => (name) => () => {
    callback({})
  };

  this.generateDownloadLink = (callback) => () => {
    
  };

};
