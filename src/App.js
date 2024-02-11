import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
let mangaanime = "anime";
function App() {
	const [animeList, setAnimeList] = useState([]);
	const [topAnime, setTopAnime] = useState([]);
	const [search, setSearch] = useState("");
	const [ma, setMA] = useState("anime");

	const handleClickManga = () =>{
		if (ma == "manga"){
			setMA("anime")
		}
		else{
			setMA("manga")
		}
	
		GetTopAnime();

	}


	const GetTopAnime = async () => {
		const temp = await fetch (`https://api.jikan.moe/v4/top/` + ma)
		.then(res => res.json());

		setTopAnime(temp.data);
	}

	useEffect(() => {
		GetTopAnime();
	}, [])
	//console.log(topAnime);

	const HandleSearch = e => {
		e.preventDefault();
		//console.log(search);
		FetchAnime(search);
	}


	const FetchAnime = async (query) =>{
		const temp = await fetch(`https://api.jikan.moe/v4/` + ma+ `?q=${query}&limit=15`)

		const tempdata = await temp.json();
		console.log(tempdata.data);
		setAnimeList(tempdata.data);
	}

	//console.log(search);
  	return (
    	<div className="App">
      		<Navbar/>
			<div className = "content-wrap">
				<button className="toggle" onClick={handleClickManga}> Toggle Between Manga and Anime </button>

			</div>

			<div className="content-wrap">
				<Sidebar topAnime={topAnime} />
				<MainContent
					HandleSearch={HandleSearch}
					search={search}
					setSearch={setSearch}
					animeList={animeList}
				/>
			</div>
    	</div>
  	);
}

export default App;
