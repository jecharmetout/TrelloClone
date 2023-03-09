export const API = "https://62d52802d4406e523554192d.mockapi.io";

export const getAllUser = async () => {
  const resp = await fetch(`${API}/trello`);
  const json = await resp.json();
  const select = document.querySelector("select");

  for (let k of json) {
    const option = document.createElement("option");
    option.id = k.id;
    option.value = k.name;
    option.innerHTML = k.name;
    select.appendChild(option);
  }
};

getAllUser();