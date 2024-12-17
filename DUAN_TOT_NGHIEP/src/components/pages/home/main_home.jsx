import Banner from "./banner"
import Header from "../../layouts/header"
import List_tour from "./list_tour"
import Top_list_tour from "./top_list_tour"
import Video_traiNghiem from "./video_traiNghiem"
import List_Xe from "./list_xe/List_Xe"
function Main_home() {
    return <>
        <Header /> 
        <Banner />
        <List_tour />
        <Top_list_tour />
        <Video_traiNghiem />
        <List_Xe/>
    </>
}

export default Main_home