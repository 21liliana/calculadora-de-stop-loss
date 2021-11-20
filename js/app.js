class FormatNumber {
  constructor() {
    this.number_to_format = '';
    this.cents = '';
    this.value = '';
    this.price_formated = 0;
  }

  format_number() {
    if (this.number_to_format.indexOf('.') != -1) {
      let get_numbers = this.number_to_format.split('.');

      get_numbers[0] = this.format_value(get_numbers[0]);
      get_numbers[1] = this.format_cents(get_numbers[1]);

      this.price_formated = get_numbers.join(',');

    } else {
      this.price_formated = this.format_value(this.number_to_format) + ',00';
    }
  }

  format_cents(cents) {

    let numberToCents = cents.split('');
    if (numberToCents.length < 2) {
      numberToCents.push('0');
    } else if (numberToCents.length > 2) {
      let intens_in_array = +numberToCents.length - 2;
      numberToCents.splice(2, intens_in_array);
    }

    let joinCents = numberToCents.join('');
    return joinCents;
  }

  format_value(value) {
    let numberToPrice = value.split('');
    if (numberToPrice.length == 4) {
      numberToPrice.splice(1, 0, '.');
    } else if (numberToPrice.length == 5) {
      numberToPrice.splice(2, 0, '.');
    } else if (numberToPrice.length == 6) {
      numberToPrice.splice(3, 0, '.');
    }

    let joinPrice = numberToPrice.join('');
    return joinPrice;
  }

  get_fomated_price() {
    return this.price_formated;
  }

  set_value(value) {
    this.number_to_format = value.toString();
    this.format_number();
  }
}
// --------------

const format_banca = new FormatNumber();

function calculo_stop(stop_ideal, m_factor, stake, soma = false) {

  let multi = 1;
  let stake_anterior = stake;
  let contador = 0;
  if (soma) {

    while (multi) {
      stake = (m_factor * stake) + stake_anterior;
      console.log(stake);

      if (stake > stop_ideal) {
        format_banca.set_value(stake_anterior);
        let banca_ideal = format_banca.get_fomated_price();

        format_banca.set_value(stake);
        let valor_ultra = format_banca.get_fomated_price();
        console.log('valor ultra: ' + valor_ultra);

        const obj_ret = {
          'banca_ideal': banca_ideal,
          'valor_ultra': valor_ultra,
          'contador': contador
        };
        multi = false;
        return obj_ret;
      }
      contador++;
      stake_anterior = stake;
    }

  } else {
    while (multi) {
      stake = m_factor * stake;
      console.log(stake);

      if (stake > stop_ideal) {
        format_banca.set_value(stake_anterior);
        let banca_ideal = format_banca.get_fomated_price();

        format_banca.set_value(stake);
        let valor_ultra = format_banca.get_fomated_price();
        console.log('valor ultra: ' + valor_ultra);

        const obj_ret = {
          'banca_ideal': banca_ideal,
          'valor_ultra': valor_ultra,
          'contador': contador
        };
        multi = false;
        return obj_ret;
      }
      contador++;
      stake_anterior = stake;
    }
  }

}

function show_calc_in_table(stop_loss, recom_stop, stop_ultra, vezes_mg) {
  let table_data = document.querySelectorAll('td');
  table_data[0].innerHTML = '$' + stop_loss;
  table_data[1].innerHTML = '$' + stop_ultra;
  table_data[2].innerHTML = '$' + recom_stop;
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






// calculo_stop(7, 2.1, 0.35);