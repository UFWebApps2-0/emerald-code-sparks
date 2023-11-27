import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

export default function NonOrgMember() {
  function handleReturnHome(e) {
    e.preventDefault();
    navigate("/");
  }
  const navigate = useNavigate();
  return (
    <div className="container nav-padding">
      <NavBar />
      <p>You are not a member of an organization.</p>
      <button onClick={handleReturnHome}>Click here to go Home</button>
    </div>
  );
}