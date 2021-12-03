	let calc = document.querySelector('form#calculator');
	let cost = calc.querySelector('#cost');
	let res3 = calc.querySelector('#res3');
	let dStyle = calc.querySelector('#dStyle');
	
	let typeAuto;
	let lengthTrip = calc.querySelector('#res2').innerText = +calc.querySelector('#length').value;
	let driveStyle = 1;
	res3.innerText = dStyle[dStyle.selectedIndex].text;
	let conditioner = 0;
	let costFuel = calc.querySelector('#res5').innerText = +cost.value;
	
	calc.addEventListener('input', changeData);
	calc.querySelector('input#count').onclick = calculate;
	
	function changeData(e) {
		calc.querySelector('#res6').innerText = '';
		calc.querySelector('#res7').innerText = '';		
	
		if(e.target.name == 'typeauto') {
			typeAuto = +e.target.value;
			
			calc.querySelector('#res1').innerText = e.target.getAttribute('view');
		} else if(e.target == calc.querySelector('#length')) {
			lengthTrip = calc.querySelector('#res2').innerText = +e.target.value;
		} else if(e.target == calc.querySelector('#band_range')) {
			for(let o of dStyle.options) {
				if(o.value == e.target.value) {
					driveStyle = +e.target.value;
					
					o.selected = true;
					
					res3.innerText = o.innerText;
					return;
				};
			};
		} else if(e.target == dStyle) {
			calc.querySelector('#band_range').value = e.target.value;
			res3.innerText = dStyle[dStyle.selectedIndex].text;
			
			driveStyle = +e.target.value;
		} else if(e.target == calc.querySelector('#check1')){
			if((calc.querySelector('#check1').checked)) {
				calc.querySelector('#res4').innerText = 'Да';
				
				conditioner = 0.5;
			} else {
				calc.querySelector('#res4').innerText = 'Нет';
				
				conditioner = 0;
			};
		} else if(e.target == cost) {
			calc.querySelector('#res5').innerText = cost.value;
			
			costFuel = +cost.value;
		};
	}
	
	function calculate() {
		if(!typeAuto) {
			let msg = document.createElement('span');
			msg.style.color = 'red';
			msg.innerText = 'Выберите тип транспорта';
			calc.querySelector('.result').after(msg);
			setTimeout(() => msg.remove(), 2000);
			return;
		};
		
		let result = Math.round((typeAuto + conditioner) * lengthTrip * driveStyle) / 100;
		
		calc.querySelector('#res6').innerText = result;
		calc.querySelector('#res7').innerText = Math.round(result * costFuel);
	}
	
	function exportWord(elem){
		let header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
		let footer = "</body></html>";
		
		let sourceHTML = header + elem.innerHTML + footer;
       
		let source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
		
		let fileDownload = document.createElement("a");
		document.body.appendChild(fileDownload);
		fileDownload.href = source;
		fileDownload.download = 'Расчет поездки.doc';
		fileDownload.click();
		document.body.removeChild(fileDownload);
	}