import logo from "../assets/images/logo.webp";

function Header() {
	return (
		<header>
			<img src={logo} className="logo" alt="Wizdle" />
		</header>
	);
}
export default Header;
