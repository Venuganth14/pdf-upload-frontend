export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
export const isUserData = () => {
  const userDataString = localStorage.getItem("userData");
  if (userDataString) {
    
    const userData = JSON.parse(userDataString);
    
    if (userData && userData._id) {
      
      return true;
    } else {
      
      return false;
    }
  } else {
    
    return false;
  }
};

export const fetchUserData = async () => {
  try {
    const userDataString = localStorage.getItem("userData");

    if (userDataString) {
      const userData = JSON.parse(userDataString);

      if (userData && userData._id) {
        const response = await fetch(
          `http://localhost:3000/api/member/${userData._id}`
        );

        if (response.ok) {
          const userDataFromFetch = await response.json();
          console.log(userDataFromFetch);
            
          return userDataFromFetch;
        } else {
       
          throw new Error("Fetch request failed");
        }
      } else {
        
        redirectToLoginPage();
        return {};
      }
    } else {
    
      redirectToLoginPage();
      return {};
    }
  } catch (error) {

    console.error("Error in fetchUserData:", error);
    redirectToLoginPage();
    return {};
  }
};

function redirectToLoginPage() {

  window.location.href = "/login";
}
