import { useEffect, useState } from "react";
import { store } from "../../components";
import { useRouterAppProvider } from "../../providers/routerAppProvider/routerAppProvider";
const LANG = require("./../../assets/langs.json");

export interface DragDropProps {
  count: number;
  next: string;
  previous: any;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
  img: string;
}

export function DragDrop() {
  const browserRouter = useRouterAppProvider();
  const [data, setData] = useState<Result[]>([]);
  const [favorites, setFavorites] = useState<Result[]>([]);
  const [notFavorites, setNotFavorites] = useState<Result[]>([]);
  /**
   * Start dragging
   * @param e
   * @param widget
   */
  function handleOnDrag(e: React.DragEvent<HTMLDivElement>, widget: string) {
    console.log("dragging", widget);
    e.dataTransfer.setData("text/plain", widget);
  }
  /**
   * Drop
   * @param e
   */
  function handleOnDrop(e: React.DragEvent<HTMLDivElement>) {
    const currentTarget = e.currentTarget as HTMLDivElement;
    const pokemon = e.dataTransfer.getData("text/plain");
    if (currentTarget.id === "favorites") {
      setFavorites([
        ...(favorites as any),
        ...data.filter((x) => x.name === pokemon),
      ]);
    } else if (currentTarget.id === "notFavorites") {
      setNotFavorites([
        ...(notFavorites as any),
        ...data.filter((x) => x.name === pokemon),
      ]);
    }
    store.dispatch({ type: "COMPLETE" });
    console.log("store", store.getState());
    setData(data.filter((x) => x.name !== pokemon));
    browserRouter.setRouter();
  }
  /**
   * Drag over
   * @param e
   */
  function handleOnDragOver(e: React.DragEvent<HTMLDivElement>) {
    console.log("dragging over");
    e.preventDefault();
  }
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((response) => response.json())
      .then(({ results }) => {
        setData(
          results.map((result: Result, i: number) => ({
            name: result.name,
            url: result.url,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
              i + 1
            }.svg`,
          }))
        );
        setNotFavorites([]);
        setFavorites([]);
      });
  }, []);
  return (
    <>
      <div className="row">
        <div id="data" className="col-6 border">
          <h1 className="bg-warning text-wrap text-sm-start">
            {LANG.APP.LABEL.POKEMONS}
          </h1>
          {data.map((pokemon, index) => (
            <div
              key={index}
              className="bg-dark"
              draggable
              onDragStart={(e) => handleOnDrag(e, pokemon.name)}
            >
              <div className="row">
                <div className="col-2">
                  <img src={pokemon.img} alt={pokemon.name} width={50} />
                </div>
                <div className="col">
                  <span>{pokemon.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          id="favorites"
          className="col-6 border"
          onDragOver={handleOnDragOver}
          onDrop={handleOnDrop}
        >
          <h1 className="bg-success text-wrap text-sm-start">
            {LANG.APP.LABEL.FAVORITES}
          </h1>
          {favorites.map((x, i) => (
              <div key={i} className="row">
                <div className="col-2">
                  <img src={x.img} alt={x.name} width={50} />
                </div>
                <div className="col">
                  <span>{x.name}</span>
                </div>
              </div>
          ))}
        </div>
        {/* <div
          id="notFavorites"
          className="col-6 border"
          onDragOver={handleOnDragOver}
          onDrop={handleOnDrop}
        >
          <h1 className="bg-info text-wrap text-sm-start">
            {LANG.APP.LABEL.NOFAVORITES}
          </h1>
          {notFavorites.map((x, i) => (
            <div key={i} className="bg-dark">
              <img key={i} src={x.img} alt={x.name} width={50} />
              <span>{x.name}</span>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
}
