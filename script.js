document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('info-form');
  const flipCard = document.getElementById('flipCard');
  const cardFront = document.getElementById('card-front');
  const cardBack = document.getElementById('card-back');
  const flipBtn = document.getElementById('flip-btn');
  const slipContainer = document.getElementById('slipContainer');
  const generateSlipBtn = document.getElementById('generate-slip');
  const pvcCardBtn = document.getElementById('pvc-card-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById('fullName').value,
      dob: document.getElementById('dob').value,
      bloodGroup: document.getElementById('bloodGroup').value,
      contact: document.getElementById('emergencyContact').value,
      address: document.getElementById('address').value,
      allergies: document.getElementById('allergies').value,
      conditions: document.getElementById('medicalConditions').value,
      meds: document.getElementById('medications').value,
      doctor: document.getElementById('doctorContact').value,
    };

    const photoInput = document.getElementById('userPhoto');
    const photoFile = photoInput.files[0];

    if (photoFile) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const photoURL = event.target.result;

        cardFront.innerHTML = `
          <div class="card-front-left">
            <div><strong>Name:</strong> ${data.name}</div>
            <div><strong>DOB:</strong> ${data.dob}</div>
            <div><strong>Blood:</strong> ${data.bloodGroup}</div>
            <div><strong>Emergency:</strong> ${data.contact}</div>
            <div><strong>Address:</strong> ${data.address}</div>
          </div>
          <div class="card-front-photo">
            <img src="${photoURL}" class="card-photo-large" alt="User Photo" />
          </div>
        `;

        cardBack.innerHTML = `
          <div class="card-back-info">
            <div><strong>Allergies:</strong> ${data.allergies || 'None'}</div>
            <div><strong>Conditions:</strong> ${data.conditions || 'None'}</div>
            <div><strong>Medications:</strong> ${data.meds || 'None'}</div>
            <div><strong>Doctor:</strong> ${data.doctor || 'None'}</div>
          </div>
        `;
      };
      reader.readAsDataURL(photoFile);
    } else {
      cardFront.innerHTML = `
        <div class="card-front-left">
          <div><strong>Name:</strong> ${data.name}</div>
          <div><strong>DOB:</strong> ${data.dob}</div>
          <div><strong>Blood:</strong> ${data.bloodGroup}</div>
          <div><strong>Emergency:</strong> ${data.contact}</div>
          <div><strong>Address:</strong> ${data.address}</div>
        </div>
      `;

      cardBack.innerHTML = `
        <div class="card-back-info">
          <div><strong>Allergies:</strong> ${data.allergies || 'None'}</div>
          <div><strong>Conditions:</strong> ${data.conditions || 'None'}</div>
          <div><strong>Medications:</strong> ${data.meds || 'None'}</div>
          <div><strong>Doctor:</strong> ${data.doctor || 'None'}</div>
        </div>
      `;
    }

    // Update slip view
    slipContainer.innerHTML = `
      <div class="slip">
        <h3>Emergency Info Slip</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>DOB:</strong> ${data.dob}</p>
        <p><strong>Blood Group:</strong> ${data.bloodGroup}</p>
        <p><strong>Emergency Contact:</strong> ${data.contact}</p>
        <p><strong>Address:</strong> ${data.address}</p>
        <p><strong>Allergies:</strong> ${data.allergies || 'None'}</p>
        <p><strong>Conditions:</strong> ${data.conditions || 'None'}</p>
        <p><strong>Medications:</strong> ${data.meds || 'None'}</p>
        <p><strong>Doctor Contact:</strong> ${data.doctor || 'None'}</p>
      </div>
    `;
  });

  flipBtn.addEventListener('click', () => {
    flipCard.classList.toggle('flipped');
  });

  pvcCardBtn.addEventListener('click', () => {
    flipCard.style.display = 'flex';
    slipContainer.style.display = 'none';
  });

  generateSlipBtn.addEventListener('click', () => {
    slipContainer.style.display = 'block';
    flipCard.style.display = 'none';

    html2canvas(slipContainer, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#fff'
    }).then(canvas => {
      const slipImg = canvas.toDataURL('image/png');
      const pdf = new window.jspdf.jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a5' });
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(slipImg, 'PNG', 0, 0, width, height);
      pdf.save('emergency_slip.pdf');
    });
  });
});
