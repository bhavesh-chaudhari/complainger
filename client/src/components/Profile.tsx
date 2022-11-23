import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { UserType } from '../types/user';
import { getUserFromLocalStorage } from '../utils/localStorage';
import { format, formatDistance, parseISO } from 'date-fns';
import ProfileEditForm from './ProfileEditForm';
import { Pattern1 } from './svgs';
import clsx from 'clsx';
import { useUserComplaintsCount } from '../hooks/useUser';

const Profile = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    setUser(getUserFromLocalStorage());
  }, []);

  const { data: complaintsCount } = useUserComplaintsCount();

  const userData = Object.entries(user || {});

  const [editing, setEditing] = useState(false);

  return (
    <div className="w-[100%] px-16 py-8 flex justify-center items-stretch">
      <div className="w-full flex bg-white rounded-lg justify-center">
        <div className="w-[50%] border border-blue-100 rounded-lg overflow-hidden relative flex items-center justify-start gap-3 bg-white py-10 flex-col">
          <div className="border-2 relative z-10 bg-white border-dashed flex flex-col justify-center rounded-lg border-blue-500 p-5 shadow-md">
            <div>
              <Avatar
                size="150px"
                color="#0b51c1"
                name={`${user?.first_name} ${user?.last_name}`}
              ></Avatar>
            </div>
          </div>
          <div className="relative z-10 bg-white">
            <h3 className="w-full font-bold text-center text-xl">
              <span className="text-blue-500">{user?.first_name}</span>{' '}
              {user?.last_name}
            </h3>
            <div className="text-center uppercase text-xs mt-2 font-semibold opacity-80 text-gray-700">
              {user && (
                <p>
                  Joined{' '}
                  {formatDistance(
                    new Date(String(user?.createdAt)),
                    new Date(),
                    {
                      addSuffix: true,
                    }
                  ).replace('about ', '')}
                </p>
              )}
            </div>
          </div>
          <div className="flex relative z-10 bg-white flex-col w-[80%] border-t border-gray-200 pt-6">
            <table className="border-b table-fixed w-full border-gray-300 border-collapse">
              <tbody>
                {userData.slice(3, userData.length - 2).map((item, index) => {
                  return (
                    <tr key={index}>
                      <td
                        className={clsx(
                          `font-semibold capitalize border py-2 px-4 w-[50%] border-gray-300 border-collapse`
                        )}
                      >
                        {item[0].replace('_', ' ')}
                      </td>
                      <td
                        className={clsx(
                          'border py-2 px-4 w-[50%] border-gray-300 border-collapse',
                          ['gender'].includes(item[0]) && 'capitalize',
                          ['department'].includes(item[0]) && 'uppercase'
                        )}
                      >
                        {['createdAt'].includes(item[0])
                          ? format(new Date(item[1]), 'dd-MM-yyyy')
                          : String(item[1])}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td className="font-semibold capitalize border py-2 px-4 w-[50%] border-gray-300 border-collapse">
                    Complaints Made
                  </td>
                  <td className="border py-2 px-4 w-[50%] border-gray-300 border-collapse">
                    {complaintsCount}
                  </td>
                </tr>
                {user?.role === 'student' && (
                  <tr>
                    <td className="border py-2 px-4 w-[50%] border-gray-300 border-collapse">
                      Enrollment number
                    </td>
                    <td className="border py-2 px-4 w-[50%] border-gray-300 border-collapse">
                      BT20CSE006
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="absolute opacity-20 w-full h-full top-4 origin-top-left left-0 -z-1">
            <Pattern1 width={'100%'} height={'100%'}></Pattern1>
          </div>
        </div>
        <div className="py-8 px-12 w-[50%]">
          <div className="mb-4">
            <h2 className="text-xl font-bold opacity-80">Update Profile</h2>
          </div>
          <ProfileEditForm
            editing={editing}
            setEditing={setEditing}
            user={user}
          ></ProfileEditForm>
        </div>
      </div>
    </div>
  );
};

export default Profile;
