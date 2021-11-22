// --------------

function calculo_stop(stop_ideal, m_factor, stake, soma = false) {

  let multi = 1;
  let stake_anterior = stake;
  let soma_valores = stake;
  let contador = 0;
  let soma_anterior = 0;
  if (soma) {
    while (multi) {
      stake = (m_factor * stake) + stake_anterior;
      soma_valores += stake;
      if (soma_valores > stop_ideal) {
        let banca_ideal = soma_anterior;
        let valor_ultra = soma_valores;

        const obj_ret = {
          'banca_ideal': banca_ideal.toLocaleString('en-us', { style: 'currency', currency: 'USD' }),
          'valor_ultra': valor_ultra.toLocaleString('en-us', { style: 'currency', currency: 'USD' }),
          'contador': contador
        };
        multi = false;
        return obj_ret;
      }
      contador++;
      stake_anterior = stake;
      soma_anterior = soma_valores;
    }

  } else {
    while (multi) {
      if (soma_valores > stop_ideal) {
        let banca_ideal = soma_anterior;
        let valor_ultra = soma_valores;

        const obj_ret = {
          'banca_ideal': banca_ideal.toLocaleString('en-us', { style: 'currency', currency: 'USD' }),
          'valor_ultra': valor_ultra.toLocaleString('en-us', { style: 'currency', currency: 'USD' }),
          'contador': contador
        };
        multi = false;
        return obj_ret;
      }
      contador++;
      stake_anterior = stake;
      soma_anterior = soma_valores;
    }
  }

}

function show_calc_in_table(stop_loss, recom_stop, stop_ultra, vezes_mg) {
  let table_data = document.querySelectorAll('td');
  table_data[0].innerHTML = stop_loss.toLocaleString('en-us', { style: 'currency', currency: 'USD' });
  table_data[1].innerHTML = stop_ultra;
  table_data[2].innerHTML = recom_stop;
  table_data[3].innerHTML = vezes_mg;
}

function show_calc(form_element, container_to_show) {
  let stop_loss = +form_element['stop'].value;
  let stake = +form_element['stake'].value;
  let mfactor = +form_element['mfactor'].value;
  let soma_form = form_element['soma'];


  if (typeof stop_loss == 'number' && typeof stake == 'number' && typeof mfactor == 'number') {
    if (soma_form.checked) {
      var calc_result = calculo_stop(stop_loss, mfactor, stake, true);
    } else {
      var calc_result = calculo_stop(stop_loss, mfactor, stake);
    }
  }

  container_to_show.innerHTML = calc_result.banca_ideal;
  show_calc_in_table(stop_loss, calc_result.banca_ideal.toString(), calc_result.valor_ultra.toString(), calc_result.contador.toString());
}

let button_form = document.querySelector('.btn-submit');
let form_calc = document.forms['form'];

form_calc.addEventListener("submit", function (e) {
  e.preventDefault();

  let show_value = document.querySelector('.show_number');
  show_calc(form_calc, show_value);
})


