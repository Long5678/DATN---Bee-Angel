import "../../../publics/styles/user_infor.scss"
import Header from "../../layouts/header"
import Tab_userInfor from "./tab_userInfor"
import Profile_userInfor from "./profile_userInfor"

function Main_userInfor() {
  return <>
    <Header />
    <main className="main_userInfor">
      <article className="article-userInfor">
        <Tab_userInfor />
        <Profile_userInfor />
      </article>
    </main>
  </>
}

export default Main_userInfor
