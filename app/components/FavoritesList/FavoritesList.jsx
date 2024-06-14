import React from "react";

const FavoritesList = ({ favorites, onRemove }) => {
  return (
    <>
      {" "}
      <div>
        <h3>Favorite Cities</h3>
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.id}>
              {favorite.city}
              <button onClick={() => onRemove(favorite.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FavoritesList;
