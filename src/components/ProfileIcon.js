import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { getToken, logout } from "../utils/auth";
import { LogoutIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { ListItemIcon } from '@mui/material';
import axios from 'axios';
import { GET_USER_LOGGED_IN, SHOW_PHOTO } from '../constants/urls';

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

const ProfileIcon = () => {
	const [admin, setAdmin] = useState({});

	const fetchAdmin = () => {
		axios
			.post(GET_USER_LOGGED_IN, getToken(), {
				headers: { Authorization: `Bearer ${getToken()}` },
			})
			.then((res) => {
				console.log("response profile icon: ", res);
				setAdmin(res.data.data);
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		fetchAdmin();
	}, []);

	return (
		<Menu as="div" className="ml-3 relative">
			<div className="flex flex-row items-center gap-4">
				<p className="text-black">Hello, <strong>{ admin.name }</strong></p>
				<Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary">
					<span className="sr-only">Open user menu</span>
					<img
						className="h-12 w-12 rounded-full"
						src={SHOW_PHOTO(admin.photo)}
						alt="Admin"
					/>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
					<Link to="/" onClick={logout}>
						<li className="block py-2.5 px-4 rounded transition duration-200 hover:bg-primary-hover hover:text-white">
							<div className="flex flex-row items-center gap-x-2">
								<div className="flex flex-row items-center gap-x-2">
									<ListItemIcon>
										<LogoutIcon className="w-6" />
									</ListItemIcon>
									<span className="text-gray-500">Logout</span>
								</div>
							</div>
						</li>
					</Link>
				</div>
			</Transition>
		</Menu>
	);
};

export default ProfileIcon;