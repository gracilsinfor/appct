$(function () {

  const frmElements = ['chk_ativo', 'txt_nome', 'date_entrada', 'txt_nif', 'txt_tel', 'txt_email'];
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
    document.getElementById('bt_atualizar_foto').style.display = 'none';

    for (const e of frmElements) {
      document.getElementById(e).disabled = false;
    }

    document.getElementById('bt_submit_dados').style.display = 'block';

    document.getElementById('bt_back_dados').style.display = 'block';

  });

  document.getElementById('bt_back_dados').addEventListener('click', (event) => {
    rstValMsgs();
    rstrCached();
    document.getElementById('bt_back_dados').style.display = 'none';

    for (const e of frmElements) {
      document.getElementById(e).disabled = true;
    }
    document.getElementById('bt_atualizar_foto').style.display = 'block';
    document.getElementById('bt_atualizar_dados').style.display = 'block';
    document.getElementById('bt_submit_dados').style.display = 'none';
  });


  document.getElementById('bt_submit_foto').addEventListener('click', (event) => {
    $("#frm_condutor").submit();
  });

  document.getElementById('bt_submit_dados').addEventListener('click', (event) => {
    $("#frm_condutor").submit();
  });



  document.getElementById('inp_file_img').addEventListener('change', (event) => {
    const fileInput = document.getElementById('inp_file_img');
    const [file] = fileInput.files;
    if (file) {
      const lbl = document.getElementById("lbl_file_name");
      const hiddTxt = document.getElementById('txt_file_name_H');
      const fName = file.name;
      lbl.innerText = fName;
      hiddTxt.value = document.getElementById('txt_nif').value;
      const photoImg = document.getElementById('img_foto');
      photoImg.src = URL.createObjectURL(file);
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
  $.validator.addMethod('isnif', function (value, element, param) {
    const regex = new RegExp(/^([1-3]\d{8})$/);
    return regex.test(value);
  });
  $.validator.addMethod('istel', function (value, element, param) {
    const regex = new RegExp(/(^(93)|^(91)|^(96)|^(92)|^(2\d{1}))\d{7}$/);
    return regex.test(value);
  });
  $.validator.addMethod('isemail', function (value, element, param) {
    const regex = new RegExp(/(^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b)$/i);
    return regex.test(value);
  });
  $.validator.addMethod('isdate', function (value, element, param) {
    return new Date(value) <= Date.now();
  });

  $("form[name='frmCondutor']").validate({
    // $('#frm_condutor').validate({
    ignore: [],
    rules: {
      nome: { required: true, minlength: 20 },
      nif: { required: true, number: true, isnif: true },
      tel: { required: true, number: true, istel: true },
      email: { required: true, isemail: true },
      entrada: { required: true, isdate: true },
      inpFileImg: { filesize: 204800 },
      fileNameH: { required: true }
    },
    messages: {
      nome: {
        required: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; indique o nome do condutor!</span>',
        minlength: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; insira um nome com pelo menos 20 caratéres!</span>',
      },
      nif: {
        required: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; indique o número de informação fiscal do condutor!</span>',
        number: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; insira um nif de 9 algarismos válido!</span>',
        isnif: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; insira um nif de 9 algarismos válido!</span>'
      },
      tel: {
        required: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; indique um número de contacto telefónico do condutor!</span>',
        number: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; insira um número de telefone válido!</span>',
        istel: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; insira um número de telefone nacional!</span>'
      },
      email: {
        required: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; indique o endereço de email do condutor!</span>',
        isemail: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; insira um endereço de email válido / bem formado!</span>'
      },
      entrada: {
        required: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; indique a data de entrada em serviço!</span>',
        isdate: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; a data de entrada em serviço não pode ser posterior à data atual!</span>',
      },
      inpFileImg: {
        filesize: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; O tamanho do ficheiro a carregar ultrapassa o máximo de 200kB</span>',
      },
      fileNameH: {
        required: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; indique um ficheiro com foto do condutor (jpg, png)</span>'
      }
    }
  });
});
