$(function () {

  document.getElementById('chk_ev').addEventListener('input', (event) => {
    const qBat = document.getElementById('txt_qbateria');
    const chkEv = document.getElementById('chk_ev');
    qBat.disabled = !chkEv.checked;

  });

  document.getElementById('inp_file_img').addEventListener('change', (event) => {
    const fileInput = document.getElementById('inp_file_img');
    const [file] = fileInput.files;
    if (file) {
      const lbl = document.getElementById("lbl_file_name");
      const hiddTxt = document.getElementById('txt_file_name_H');
      const fName = file.name;
      lbl.innerText = fName;
      hiddTxt.value = fName;
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

  $.validator.addMethod('isplate', function (value, element, param) {
    const regex = new RegExp(/(^([a-zA-Z]{2}-\d{2}-\d{2}))$|(^(\d{2}-[a-zA-Z]{2}-\d{2}))$|(^(\d{2}-\d{2}-[a-zA-Z]{2}))$/);
    return regex.test(value);
  });

  $("form[name='frmViatura']").validate({
    // $('#frmViatura').validate({
    ignore: [],
    rules: {
      qbateria: { required: true, number: true, range: [40, 150] },
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
        filesize: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; O tamanho do ficheiro a carregar ultrapassa o máximo de 200kB</span>',
      },
      fileNameH: {
        required: '<span class="ml-5 small text-danger">&nbsp; <i class="fas fa-exclamation-circle"></i> &nbsp; Indique um ficheiro com foto da viatura (jpg, png)</span>'
      }
    }
  });
});
