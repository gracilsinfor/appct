$(function () {

  const dataElements = ['chk_ativo', 'txt_nome', 'txt_tel', 'txt_email', 'date_entrada', 'txt_nif'];

  document.getElementById('bt_atualizar_foto').addEventListener('click', (event) => {
    document.getElementById('bt_atualizar_foto').style.display='none';
    document.getElementById('lbl_input_file_disabled').style.display='none';
    document.getElementById('lbl_input_file_enabled').style.display='block';
    document.getElementById('foto_updt_button_set').style.display='block';
    document.getElementById('bt_atualizar_dados').disabled = true;
  });


  document.getElementById('bt_atualizar_dados').addEventListener('click', (event) => {
    document.getElementById('bt_atualizar_dados').style.display='none';
    for(const e of dataElements){
      document.getElementById(e).disabled=false;
    }
    document.getElementById('dados_updt_button_set').style.display='block';
    document.getElementById('bt_atualizar_foto').disabled = true;
  });

  document.getElementById('bt_submit_foto').addEventListener('click', (event) => {
    document.forms[0].submit();
  });

  document.getElementById('bt_submit_dados').addEventListener('click', (event) => {
    document.forms[0].submit();
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
