export function InaccountProfilePicture() {
  return (
    <div className="w-full aspect-square p-2 flex flex-col justify-center items-center">
      <div className="w-full aspect-square max-w-xs">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="profile picture"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </div>
  );
}
