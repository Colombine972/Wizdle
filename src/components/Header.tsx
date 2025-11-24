import { Link } from "react-router";
import logo from "../assets/images/logo.webp";

function Header() {
	return (
		<header>
			<Link to="/">
				<img src={logo} alt="Wizdle" />
			</Link>
		</header>
	);
}
export default Header;
