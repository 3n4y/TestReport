export const getProfile = async (token) => await fetch(`/api/profile?token=${token}`)
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => ({ accept: false }));

export const updateProfile = async (token, acceptMarketing) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, accept: acceptMarketing }),
  };
  return await fetch('/api/profile-update', requestOptions)
    .then((response) => {
      if (response.ok) {
        return true;
      }
      return false;
    })
    .catch((error) => false);
};
