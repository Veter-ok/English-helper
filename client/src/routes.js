import {DashboardPage} from './pages/Dashboard';
import ProfilePage from './pages/Profile';
import LoginPage from './pages/Login';
import {RegisterPage} from './pages/Register';
import WelcomePage from './pages/Welcome'; 
import { Vacabulary } from './pages/Vocabulary';
import { ABOUT_ROUTE, ADMIN_ROUTE, DASHBOARD_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, VOCABULARY_ROUTE} from "./utils/consts";

export const authRoutes = [
	{
		path: ADMIN_ROUTE,
		Component: WelcomePage
	},
	{
		path: DASHBOARD_ROUTE,
		Component: DashboardPage
	},
	{
		path: PROFILE_ROUTE,
		Component: ProfilePage
	},
	{
		path: ABOUT_ROUTE,
		Component: WelcomePage
	},
	{
		path: VOCABULARY_ROUTE,
		Component: Vacabulary
	}
]

export const publicRoutes = [
	{
		path: LOGIN_ROUTE,
		Component: LoginPage
	},
	{
		path: REGISTRATION_ROUTE,
		Component: RegisterPage
	},
	{
		path: HOME_ROUTE,
		Component: WelcomePage
	},
	{
		path: ABOUT_ROUTE,
		Component: WelcomePage
	},
	{
		path: PROFILE_ROUTE + '/:id',
		Component: ProfilePage
	}
]