import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  //quando a tela for carregada ele vai executar a função passada
  useEffect(()=>{
    const loadAll = async () => {
      //pegando a lista total dos filmes
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //pegando o filme em destaque
      let originals = list.filter(i=> i.slug === 'originals');
      //gerar um número aleatório de acordo com a quantidade de itens da lista originals
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  })

  return (
    <div className="page">

      <Header black={blackHeader}/>

      {featuredData && 
        <FeaturedMovie item={featuredData}/>
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <div>
            <MovieRow key={key} title={item.title} items={item.items}/>
          </div>
        ))}
      </section>

      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif" alt="Carregando"/>
        </div>
      }

    </div>
  )
}
