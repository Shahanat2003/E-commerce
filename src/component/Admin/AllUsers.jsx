import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AllUsers() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  async function FetchUser() {
    try {
      const res = await axios.get("http://localhost:3001/user");
      const filterdUser=res.data.filter(user=>!user.admin)
      setUsers(filterdUser);
      setLoading(false);
    } catch (error) {
      console.log("user fetching error", error);
      setLoading(true);
    }
  }

  useEffect(() => {
    FetchUser();
  }, []);

  async function handleBlock(userId, status) {
    try {
      const newStatus = !status;
      await axios.patch(`http://localhost:3001/user/${userId}`, {
        blocked: newStatus
      });
      setUsers(users.map(user =>
        user.id === userId ? { ...user, blocked: newStatus } : user
      ));
    } catch (error) {
      console.log("error setting user status", error);
    }
  }

  return (
    <div className='min-h-screen p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200'>
      <div className="p-6">

        <h2 className="text-2xl font-bold mb-4">All Users</h2>
        
        <div className="overflow-x-auto">
          <div className="bg-gray-200 p-2 flex flex-col md:flex-row font-bold">
            <div className="flex-1 p-2">ID</div>
            <div className="flex-1 p-2">Username</div>
            <div className="flex-1 p-2">Email</div>
            <div className="flex-1 p-2 text-center">Actions</div>
          </div>

          {loading ? (
            <div className="text-center text-gray-500 mt-4">Loading....</div>
          ) : (
            <div>
              {users.map((user) => (
                <div
                  key={user.id}
                  className="bg-white p-2 border-b border-gray-200 flex flex-col md:flex-row items-center"
                >
                  <div className="flex-1 p-2 text-sm">{user.id}</div>
                  <div className="flex-1 p-2 text-sm">{user.username}</div>
                  <div className="flex-1 p-2 text-sm">{user.email}</div>
                  <div className="flex-1 p-2 flex justify-center space-x-2">
                    <Link to={`${user.id}`}>
                      <button className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600 text-xs">
                        See More
                      </button>
                    </Link>
                    {user.blocked ? (
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 text-xs"
                        onClick={() => handleBlock(user.id, user.blocked)}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="bg-green-700 text-white py-1 px-3 rounded hover:bg-green-800 text-xs"
                        onClick={() => handleBlock(user.id, user.blocked)}
                      >
                        Block
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
