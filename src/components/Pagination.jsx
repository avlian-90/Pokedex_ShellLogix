import Image from 'next/image';
import { usePokemonContext, ACTION_TYPES } from '../state';

function Pagination() {
  const { state, dispatch } = usePokemonContext();

  const goToPage = (page) => {
    dispatch({type: ACTION_TYPES.SET_SELECTED_PAGE, page})
  }
  const goToPrevPage = () => {
    dispatch({type: ACTION_TYPES.SET_PREV_PAGE})
  }
  const goToNextPage = () => {
    dispatch({type: ACTION_TYPES.SET_NEXT_PAGE})
  }

  return (
    <div className="pagination">
      <button disabled={state.currentPage === 1} onClick={goToPrevPage}>
        <Image
          src="/previous.svg"
          alt="previous"
          width={20}
          height={20}
        />
      </button>
      {Array.from({ length: 7 }).map((el, i) => (
        <span key={i} onClick={() => goToPage(state.currentPage + i)} className={`${i === 0 ? "active-page" : undefined} ${(state.currentPage + i) > 24 ? "hidden" : undefined}`}>
          {state.currentPage + i}
        </span>
      ))}
      <button disabled={state.currentPage >= 24} onClick={goToNextPage}>
        <Image
          src="/next.svg"
          alt="next"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
}

export default Pagination;
