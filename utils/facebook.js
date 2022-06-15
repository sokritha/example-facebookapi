//  "567519111403743";
const facebookAppId = "1775920382759583";

export function initFacebookSdk() {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return;
    // wait for facebook sdk to initialize before starting the react app
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: facebookAppId,
        cookie: true,
        xfbml: true,
        version: "v14.0",
      });

      FB.getLoginStatus(function (response) {
        console.log(response);
      });
    };

    // load facebook sdk script
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  });
}

export async function loginFacebook() {
  FB.login(function (response) {
    if (response.authResponse) {
      console.log("Welcome!  Fetching your information.... ");
      FB.api("/me", function (response) {
        console.log("Good to see you, " + response.name + ".");
      });
    } else {
      console.log("User cancelled login or did not fully authorize.");
    }
  });
}

export function logoutFacebook() {
  FB.ui({ method: "auth.logout" }, function () {
    window.location.reload();
  });
}

function getFbUserData() {
  FB.api(
    "/me",
    { locale: "en_US", fields: "id,email,gender" },
    function (response) {
      console.log(response.email);
    }
  );
}
