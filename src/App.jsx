import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setData, setLoading, setError } from "./store/data";
import { shuffleArray } from "./helpers/shuffleArray";
import QuizCard from './components/quizcard'


const fetchData = async (dispatch) => {
  try {
    dispatch(setLoading(true));


    const indexResponse = await fetch(`${import.meta.env.BASE_URL}data/index.json`);
    const indexData = await indexResponse.json();
    const { folders } = indexData; 

 
    const promises = folders.map(folder =>
      fetch(`${import.meta.env.BASE_URL}data/${folder}/info.json`).then(res => res.json())
    );

    const results = await Promise.all(promises);

    const shuffledResults = shuffleArray(results);
    dispatch(setData(shuffledResults));
  } catch (error) {
    dispatch(setError(error.toString()));
  } finally {
    dispatch(setLoading(false));
  }
};

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);


  return (
    <div className="mt-5">
      
      <QuizCard/>
      </div>
  )
}

export default App
