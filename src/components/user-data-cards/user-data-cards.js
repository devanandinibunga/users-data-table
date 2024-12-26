import React from "react";
import "./user-data-cards.scss";

export const UserDataCards = ({ userData }) => {
  return (
    <div className="user-data-card-wrapper">
      <h2>User's Details Card</h2>
      {userData?.map((user) => (
        <div key={user.id} className="card user-card">
          <div className="card-body">
            <p className="card-text">
              <strong>Name: </strong>
              {user?.name}
            </p>
            <p className="card-text">
              <strong>Email: </strong>
              {user?.email}
            </p>
            <p className="card-text">
              <strong>Address: </strong>
              {user?.address?.street}, {user?.address?.suite},{" "}
              {user?.address?.city}, {user?.address?.zipcode}.
            </p>
            <p className="card-text">
              <strong>Company Details: </strong>
              {user?.company?.name}, {user?.company?.catchPhrase},{" "}
              {user?.company?.bs}.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
