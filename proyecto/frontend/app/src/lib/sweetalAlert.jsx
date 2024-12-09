import Swal from 'sweetalert2';

export const showAlert = (title, text, icon = 'info') => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: 'OK',
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: true
  });
};

export const showConfirm = (title, text, icon = 'question') => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: true
  });
};

