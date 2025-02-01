export const removeFriendIdDashes = (friendId: string): string => {
  return friendId.replace(/-/g, "");
};

export const formatFriendId = (friendId: string): string => {
  const cleanId = removeFriendIdDashes(friendId);
  const parts = cleanId.match(/.{1,4}/g);
  return parts ? parts.join("-") : friendId;
};
