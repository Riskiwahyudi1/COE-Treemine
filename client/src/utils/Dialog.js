import Swal from 'sweetalert2';

const Dialog = Swal.mixin({
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#d33',
  cancelButtonColor: '#3085d6',
  confirmButtonText: 'Ya',
  cancelButtonText: 'Batal',
});

export default Dialog;
