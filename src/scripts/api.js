const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-35",
  headers: {
    authorization: "6ec49131-165f-41ce-95b4-ec603870fcca",
    "Content-Type": "application/json",
  },
};

const fetchData = async (path, options = {}) => {
  const response = await fetch(`${config.baseUrl}${path}`, {
    headers: config.headers,
    ...options,
  });

  if (!response.ok) {
    return await Promise.reject(
      `Request failed with status ${response.status}.`
    );
  }

  return await response.json();
};

export const getUserInfoApi = async () => {
  return await fetchData("/users/me");
};

export const getInitialCardsApi = async () => {
  return await fetchData("/cards");
};

export const updateUserInfoApi = async (name, about) => {
  return await fetchData("/users/me", {
    method: "PATCH",
    body: JSON.stringify({ name, about }),
  });
};

export const postCardApi = async (name, link) => {
  return await fetchData("/cards", {
    method: "POST",
    body: JSON.stringify({ name, link }),
  });
};

export const likeCardApi = async (cardId) => {
  return await fetchData(`/cards/likes/${cardId}`, {
    method: "PUT",
  });
};

export const unlikeCardApi = async (cardId) => {
  return await fetchData(`/cards/likes/${cardId}`, {
    method: "DELETE",
  });
};

export const updateAvatarApi = async (avatarUrl) => {
  return await fetchData("/users/me/avatar", {
    method: "PATCH",
    body: JSON.stringify({ avatar: avatarUrl }),
  });
};

export const deleteCardApi = async (cardId) => {
  return await fetchData(`/cards/${cardId}`, {
    method: "DELETE",
  });
};
