$(function () {

  const frmElements = ['chk_ativa', 'chk_ev', 'txt_matricula', 'txt_odometro', 'txt_descricao'];
  const cachedVals = [];

  function cacheVals() {
    const inputs = document.querySelectorAll('input');
    for (const i of inputs) {
      let val = {};
      if (i.id) {
        val = {
          "id": [i.id],
          "value": i.value
        }
        cachedVals.push(val);
      }
    }
  };
  
  function rstValMsgs() {
    var elems = document.querySelectorAll('.error');
    elems.forEach(itm => {
      document.getElementById(itm.id).innerHTML = ''
    })
  };

  function rstrCached() {
    let msg = '';
    for (const e of cachedVals) {
      msg += e.id + ': ' + e.value + '\r\n';
    }
    // alert(msg);
    for (const k of cachedVals) {
      let e = document.getElementById(k.id);
      if (e.type === 'checkbox') {
        e.checked = k.value;
      } else {
        e.value = k.value;
      }
    }
  };

  document.getElementById('bt_atualizar_foto').addEventListener('click', (event) => {
    cacheVals();

    document.getElementById('bt_atualizar_foto').style.display = 'none';
    document.getElementById('bt_back_foto').style.display = 'block';

    document.getElementById('lbl_input_file_disabled').style.display = 'none';
    document.getElementById('lbl_input_file_enabled').style.display = 'block';

    document.getElementById('bt_atualizar_dados').style.display = 'none';
    document.getElementById('bt_submit_foto').style.display = 'block';
  });

  document.getElementById('bt_back_foto').addEventListener('click', (event) => {
    rstrCached();
    const imgFoto = document.getElementById('img_foto');
    const imgFotoHidden = document.getElementById('img_foto_H');
    const imgFotoVisible = document.getElementById('img_foto_visible');
    const imgFotoInvisible = document.getElementById('img_foto_invisible');

    if (imgFoto.src !== imgFotoHidden.src) {
      imgFotoVisible.style.display = 'none';
      imgFotoInvisible.style.display = 'block';
    }

    document.getElementById('bt_atualizar_foto').style.display = 'block';
    document.getElementById('bt_back_foto').style.display = 'none';

    document.getElementById('lbl_input_file_disabled').style.display = 'block';
    document.getElementById('lbl_input_file_enabled').style.display = 'none';
    document.getElementById('bt_atualizar_dados').style.display = 'block';
    document.getElementById('bt_submit_foto').style.display = 'none';
  });

  document.getElementById('bt_atualizar_dados').addEventListener('click', (event) => {
    // if(!(window.confirm('Atenção vai entrar no modo de edição da base de dados!'))){
    //   event.stopPropagation();
    //   return;
    // }
    cacheVals();
    document.getElementById('bt_atualizar_dados').style.display = 'none';

    for (const e of frmElements) {
      document.getElementById(e).disabled = false;
    }
    if (document.getElementById('chk_ev').checked) {
      document.getElementById('txt_qbateria').disabled = false;
    }

    document.getElementById('bt_submit_dados').style.display = 'block';
    document.getElementById('bt_atualizar_foto').style.display = 'none';

    document.getElementById('bt_back_dados').style.display = 'block';

  });

  document.getElementById('bt_back_dados').addEventListener('click', (event) => {
    rstValMsgs();
    rstrCached();
    document.getElementById('bt_back_dados').style.display = 'none';
    if (document.getElementById('chk_ev').checked) {
      document.getElementById('txt_qbateria').disabled = true;
    }
    for (const e of frmElements) {
      document.getElementById(e).disabled = true;
    }
    document.getElementById('bt_atualizar_foto').style.display = 'block';
    document.getElementById('bt_atualizar_dados').style.display = 'block';
    document.getElementById('bt_submit_dados').style.display = 'none';
  });

  document.getElementById('bt_submit_foto').addEventListener('click', (event) => {
    $("#frm_viatura").submit();
  });

  document.getElementById('bt_submit_dados').addEventListener('click', (event) => {
    $("#frm_viatura").submit();
  });


  document.getElementById('chk_ev').addEventListener('change', (event) => {
    const qBat = document.getElementById('txt_qbateria');
    const chkEv = document.getElementById('chk_ev');
    qBat.disabled = !chkEv.checked;
    !chkEv.checked ? qBat.value = '' : '';
    // $('#frm_viatura').valid();
  });

  document.getElementById('inp_file_img').addEventListener('change', (event) => {
    const fileInput = document.getElementById('inp_file_img');
    const [file] = fileInput.files;
    if (file) {
      const lbl = document.getElementById("lbl_file_name");
      const hiddTxt = document.getElementById('txt_file_name_H');
      const fName = file.name;
      lbl.innerText = fName;
      hiddTxt.value = document.getElementById('txt_matricula').value;
      const photoImg = document.getElementById('img_foto');
      photoImg.src = URL.createObjectURL(file);
      URL.revokeObjectURL(file);
    } else {
      lbl.innerHTML = "selecionar ficheiro"
      hiddTxt.value = "";
    }
  });

  $.validator.addMethod('filesize', function (value, element, param) {
    return this.optional(element) || element.files[0].size <= param;
  });
  // $.validator.addMethod('hasphoto', function (value, element, param) {
  //   // const fileInput = document.getElementById("inp_file_img");
  //   const nameHidden = document.getElementById("txt_file_name_H");
  //   return this.files != null || nameHidden.value != null;
  // });
  $.validator.addMethod('isplate', function (value, element, param) {
    const regex = new RegExp(/(^([a-zA-Z]{2}-\d{2}-\d{2}))$|(^(\d{2}-[a-zA-Z]{2}-\d{2}))$|(^(\d{2}-\d{2}-[a-zA-Z]{2}))$|(^([a-zA-Z]{2}-\d{2}-[a-zA-Z]{2}))$/);
    return regex.test(value);
  });

  $("form[name='frmViatura']").validate({
    // $('#frmViatura').validate({
    ignore: [],
    rules: {
      qbateria: { required: '#chk_ev:checked', number: true, range: [40, 150] },
      matricula: { required: true, isplate: true },
      odometro: { required: true, number: true, range: [0, 999999] },
      descricao: { required: true, minlength: 10 },
      inpFileImg: { filesize: 204800 },
      fileNameH: { required: true }
    },
    messages: {
      qbateria: {
        required: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; Viatura elétrica, precisa inserir a capacidade de 40 a 150 kWh!</span>',
        number: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; Insira um número válido para capacidade da bateria!</span>',
        range: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; Insira um número entre 40 150 kWh para capacidade da bateria</span>'
      },
      matricula: {
        required: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; Indique uma matrícula portuguesa no formato AZ-09-09 09-AZ-99 09-09-AZ </span>',
        isplate: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; Formato de matricula eg. AZ-09-09 09-AZ-99 09-09-AZ ou equivalente</span>'
      },
      odometro: {
        number: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; Insira um número de quilómetros válido</span>',
        required: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; Indique os quilómetros registados no odómetro</span>',
        range: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; O registo de quilómetros não pode ser superior a 999999</span>'
      },
      descricao: {
        required: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; Insira uma descrição da viatura, e.g. Marca Modelo Versão</span>',
        minlength: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; A descrição deve ter mais de 10 carateres</span>'
      },
      inpFileImg: {
        //   required: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; Indique um ficheiro com foto da viatura (jpg, png)</span>',
        filesize: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; O tamanho do ficheiro a carregar ultrapassa o máximo de 200kB</span>',
        //   hasphoto: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; Indique um ficheiro com foto da viatura (jpg, png)</span>'
      },
      fileNameH: {
        required: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; Indique um ficheiro com foto da viatura (jpg, png)</span>'
      }
    }
  });
});
