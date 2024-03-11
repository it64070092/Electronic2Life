import React from "react";
import { useNavigate } from 'react-router-dom';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../actions/userActions";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";

// profile menu component

export function ComplexNavbar() {

  const user = useSelector(state => state.user);
  const username = user.user?.user?.username;
  const isAuthen = user.isAuthenticated;
  const navigate = useNavigate()
  function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end" clas>

        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <span>{username}</span>
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">


          <MenuItem

            onClick={closeMenu}
            className={`flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                `}
          >
            {React.createElement(UserCircleIcon, {
              className: `h-4 w-4   `,
              strokeWidth: 2,
            })}
            <Typography
              as="span"
              variant="small"
              className="font-normal"
              color={"inherit"}
            >
              โปรไฟล์
            </Typography>

          </MenuItem>
          <MenuItem

            onClick={()=>{navigate("/user/tracking")}}
            className={`flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
    `}
          >
            {React.createElement(UserCircleIcon, {
              className: `h-4 w-4   `,
              strokeWidth: 2,
            })}
            <Typography
              as="span"
              variant="small"
              className="font-normal"
              color={"inherit"}
            >
              ติดตามออเดอร์
            </Typography>

          </MenuItem>

          <MenuItem

            onClick={handleSignOut}
            className={`flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                `}
          >

            <Typography
              as="span"
              variant="small"
              className="font-normal"
              color={"red"}
            >
              Log Out
            </Typography>
          </MenuItem>


        </MenuList>
      </Menu>
    );
  }





  // nav list component
  const navListItems = [
    {
      label: "สินค้ามือสอง",
      icon: UserCircleIcon,
      onclick:"product"
    },
    {
      label: "เสนอขายเครื่องใช้ไฟฟ้าเก่า",
      icon: Square3Stack3DIcon,
      onclick:"sellrequest"
    },
    {
      label: "ส่งซ่อมเครื่องใช้ไฟฟ้า",
      icon: Square3Stack3DIcon,
      onclick:"fixrequest"
    },
  ];

  function NavList() {
    return (
      <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">


        {isAuthen ? (
          <>

            <Typography
              key="eiei"
              as="a"
              href="#"
              variant="small"
              color="gray"
              className="font-medium text-blue-gray-500 lg:hidden"
            >

              <MenuItem className="flex items-center gap-2 lg:rounded-full">
                {React.createElement(UserCircleIcon, { className: "h-[18px] w-[18px]" })}{" "}
                <span className="text-gray-900"> โปรไฟล์</span>
              </MenuItem>
            </Typography>

            {navListItems.map(({ label, icon, onclick}, key) => (
              <Typography
                key={label}
                as="a"
                href="#"
                variant="small"
                color="gray"
                className="font-medium text-blue-gray-500"
                onClick={()=>{navigate(`/${onclick}`)}}
              >
                <MenuItem className="flex items-center gap-2 lg:rounded-full">
                  {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                  <span className="text-gray-900"> {label}</span>
                </MenuItem>
              </Typography>

            ))}
            <Typography
              key="Logout"
              as="a"
              href="#"
              variant="small"
              color="gray"
              className="font-medium text-blue-gray-500 lg:hidden"
            >
              <MenuItem className="flex items-center gap-2 lg:rounded-full">

                <span className="text-red-500"> Log Out</span>
              </MenuItem>
            </Typography>
          </>
        ) : (<>



          {navListItems.map(({ label, icon }, key) => (
            <Typography
              key={label}
              as="a"
              href="#"
              variant="small"
              color="gray"
              className="font-medium text-blue-gray-500"
            >
              <MenuItem className="flex items-center gap-2 lg:rounded-full">
                {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                <span className="text-gray-900"> {label}</span>
              </MenuItem>
            </Typography>

          ))}
          <Typography
            key="eiei"
            as="a"
            href="#"
            variant="small"
            color="gray"
            className="font-medium text-blue-gray-500 lg:hidden"

          >

            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {" "}
              <span onClick={() => { navigate("/signin") }} className="text-gray-900 text-center"> Login</span>
            </MenuItem>
          </Typography>

        </>)}


      </ul>
    );
  }

  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const dispatch = useDispatch();
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
  const handleSignOut = () => {
    dispatch(logoutUser())
  }
  return (
    <Navbar className="mx-auto max-w-screen-3xl p-2  lg:pl-6 text-black">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Electronic2Life
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="red"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        {!isAuthen ? (
          <Button onClick={() => { navigate("/signin") }} size="sm" variant="text" className="hidden lg:block">
            <span>Log In</span>
          </Button>
        ) : (
          <div className="hidden lg:block">
            <ProfileMenu />
          </div>)}


      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}