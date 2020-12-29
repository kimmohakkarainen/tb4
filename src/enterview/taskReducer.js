export function stateIsValid({
  hetuValid,
  sukunimiValid,
  tutkimusValid,
  tutkimusPaivaValid,
  vastaanottoPaivaValid,
  esitietolomakeValid,
  esitietolomakeExpanded
}) {
  return (
    hetuValid &&
    sukunimiValid &&
    tutkimusValid &&
    tutkimusPaivaValid &&
    (esitietolomakeValid || !esitietolomakeExpanded)
  );
}

export function initialState(state) {
  if (state == null) {
    return {
      hetu: "",
      hetuValid: null,
      sukunimi: "",
      sukunimiValid: null,
      tutkimus: "",
      tutkimusValid: null,
      tutkimusPaiva: "",
      tutkimusPaivaValid: null,
      vastaanottoPaiva: "",
      vastaanottoPaivaValid: null,
      esitietolomake: "",
      esitietolomakeValid: null,
      esitietolomakeExpanded: false,
      lisatiedot: "",
      laakari: ""
    };
  }
}

export function taskReducer(state, action) {
  const payload = action.payload;

  switch (action.type) {
    case "SET_HETU":
      return {
        ...state,
        hetu: payload,
        hetuValid: payload.length === 11 ? true : false
      };

    case "SET_SUKUNIMI":
      return {
        ...state,
        sukunimi: payload,
        sukunimiValid: payload.length > 1 ? true : false
      };

    case "SET_ESITIETOLOMAKE":
      return {
        ...state,
        esitietolomake: payload,
        esitietolomakeValid: payload.length > 3 ? true : false
      };

    case "SET_LISATIEDOT":
      return {
        ...state,
        lisatiedot: payload
      };

    case "SET_LAAKARI":
      return {
        ...state,
        laakari: payload
      };

    case "SET_TUTKIMUS":
      console.log("SET_TUTKIMUS");
      console.log(payload);
      return {
        ...state,
        tutkimus: payload,
        tutkimusValid: payload == null ? false : true
      };

    case "TOGGLE_ESITIETOLOMAKE":
      return {
        ...state,
        esitietolomakeExpanded: !state.esitietolomakeExpanded,
        esitietolomakeValid: state.esitietolomakeExpanded ? true : null,
        esitietolomake: ""
      };

    case "SET_TUTKIMUSPAIVA":
      if (payload === undefined) {
        return { ...state, tutkimusPaivaValid: null };
      } else {
        return {
          ...state,
          tutkimusPaiva: payload,
          tutkimusPaivaValid: true
        };
      }

    case "SET_VASTAANOTTOPAIVA":
      if (payload === undefined) {
        return { ...state, vastaanottoPaivaValid: null };
      } else {
        return {
          ...state,
          vastaanottoPaiva: payload,
          vastaanottoPaivaValid: true
        };
      }
    case "NOT_VALID":
      return {
        ...state,
        hetuValid: state.hetu.length === 11 ? true : false,
        sukunimiValid: state.sukunimi.length > 1 ? true : false,
        esitietolomakeValid:
          state.esitietolomake.length > 3
            ? true
            : !state.esitietolomakeExpanded,
        tutkimusPaivaValid: !state.tutkimusPaiva,
        tutkimusValid: state.tutkimus === "" ? false : true
      };

    default:
      console.log(" NOT MATCHED " + action.type);
  }
}

export function handleHetu(dispatch, v) {
  dispatch({ type: "SET_HETU", payload: v.target.value });
}

export function handleSukunimi(dispatch, v) {
  dispatch({ type: "SET_SUKUNIMI", payload: v.target.value });
}

export function handleLisatiedot(dispatch, v) {
  dispatch({ type: "SET_LISATIEDOT", payload: v.target.value });
}

export function handleLaakari(dispatch, v) {
  dispatch({ type: "SET_LAAKARI", payload: v.target.value });
}

export function handleTutkimus(dispatch, v) {
  dispatch({ type: "SET_TUTKIMUS", payload: v.target.value });
}

export function handleEsitietolomake(dispatch, v) {
  dispatch({ type: "SET_ESITIETOLOMAKE", payload: v.target.value });
}

export function handleEsitietolomakeToggle(dispatch) {
  dispatch({ type: "TOGGLE_ESITIETOLOMAKE", payload: null });
}

export function handleTutkimusPaivaChange(dispatch, selectedDay, modifiers) {
  dispatch({ type: "SET_TUTKIMUSPAIVA", payload: selectedDay });
}

export function handleVastaanottoPaivaChange(dispatch, selectedDay, modifiers) {
  dispatch({ type: "SET_VASTAANOTTOPAIVA", payload: selectedDay });
}
