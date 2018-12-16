function func() {
     // Get all elements that have the "header" class
     // Получить все элементы, имеющие класс "header"
	  var elementHeader = document.querySelectorAll(".header");
	  
	  // Determining the position of columns "Automated", "Automated Status", "Obsolete"
	  // Определение положения столбцов "Automated", "Automated Status", "Obsolete"
	  var elementsList = elementHeader[0].querySelectorAll("th");
      for (var i=0; i<elementsList.length; i++) {
    	var secondList = elementsList[i].textContent;
		if (~secondList.indexOf("Automated")) {
			if (~secondList.indexOf("Automated Status")) {			
				var positionAutoStatusColumn = i;
			}
			else {
				var positionAutomatedColumn = i;
			}
		}
		if (~secondList.indexOf("Obsolete")) {			
				var positionObsoleteColumn = i;
			}		
      } 
      // Replace the column names with your own, you can add a new class
      // Заменяем названия столбцов на свои, можно добавить им новый класс
      for (var i=0; i<elementHeader.length; i++) {
      	if (positionAutoStatusColumn !== undefined) {
//			elementHeader[i].children[positionAutoStatusColumn].classList.add("header-AutoStatus");
			elementHeader[i].children[positionAutoStatusColumn].textContent = "Auto Status"; 
		}
      	if (positionAutomatedColumn !== undefined) {
//			elementHeader[i].children[positionAutomatedColumn].classList.add("header-Automated");
			elementHeader[i].children[positionAutomatedColumn].textContent = "Sub- type"; 	  
		}
      	if (positionObsoleteColumn !== undefined) {
//			elementHeader[i].children[positionObsoleteColumn].classList.add("header-Obsolete");
			elementHeader[i].children[positionObsoleteColumn].textContent = "Dead";
      	}		
      }
      // Delete the text in those columns where it is not needed, add a class that would then put this cell through css appropriate icon
	  // Удаляем текст в тех столбцах где он не нужен, добавляем класс, что бы потом через css подставить этой ячейке соответствующую иконку
	  var elementsRows = document.querySelectorAll(".row");
	  
	  for (var i=0; i<elementsRows.length; i++) {
		if (positionAutoStatusColumn !== undefined) {
			var tempString = elementsRows[i].children[positionAutoStatusColumn].textContent;
			if (~tempString.indexOf("Not Automated")){
				elementsRows[i].children[positionAutoStatusColumn].classList.add("button-NotAutomatedAutoStatus");
				elementsRows[i].children[positionAutoStatusColumn].textContent = "Not Auto"; //здесь заменяем, что бы следующий if не добавил еще один класс ошибочно
			}
			else if (~tempString.indexOf("Automated")){			
				elementsRows[i].children[positionAutoStatusColumn].classList.add("button-AutomatedAutoStatus");
				elementsRows[i].children[positionAutoStatusColumn].textContent = "";
			}
			else if (~tempString.indexOf("Сhanged")){			
				elementsRows[i].children[positionAutoStatusColumn].classList.add("button-СhangedAutoStatus");
				elementsRows[i].children[positionAutoStatusColumn].textContent = "";
			}
		}
		if (positionAutomatedColumn !== undefined) {
			var tempString = elementsRows[i].children[positionAutomatedColumn].textContent;
			if (~tempString.indexOf("Yes")){
				elementsRows[i].children[positionAutomatedColumn].classList.add("button-YesAutomated");
				elementsRows[i].children[positionAutomatedColumn].textContent = "";
			}
			else if (~tempString.indexOf("No")){			
				elementsRows[i].children[positionAutomatedColumn].classList.add("button-NoAutomated");
				elementsRows[i].children[positionAutomatedColumn].textContent = "";
			}			 
		} 			
	    if (positionObsoleteColumn !== undefined) {
			var tempString = elementsRows[i].children[positionObsoleteColumn].textContent;
			if (~tempString.indexOf("Yes")){
				elementsRows[i].children[positionObsoleteColumn].classList.add("button-YesObsolete");
				elementsRows[i].children[positionObsoleteColumn].textContent = "";
			}
			else if (~tempString.indexOf("No")){			
				elementsRows[i].children[positionObsoleteColumn].classList.add("button-NoObsolete");
			}			 
	    } 			
	  }	  
	  // Change the width of custom columns
      // Изменяем ширину кастомных столбцов
      var tempTagColgroup = document.getElementsByTagName('colgroup');
      for (var i=0; i<tempTagColgroup.length; i++) {
      	if (positionAutoStatusColumn !== undefined) {	
            tempTagColgroup[i].children[positionAutoStatusColumn].outerHTML = '<col style="width: 50px">';
      	}
        if (positionAutomatedColumn !== undefined) {
        	tempTagColgroup[i].children[positionAutomatedColumn].outerHTML = '<col style="width: 40px">';
        }
        if (positionObsoleteColumn !== undefined) {
         	tempTagColgroup[i].children[positionObsoleteColumn].outerHTML = '<col style="width: 40px">';	  	  
        }
      }
}
	// A function that tracks partition switching and calls the main function as a handler
	// Функция которая отслеживает переключение разделов и вызывает в качестве обработчика основную функцию
function newSection() {
	var innerContent = document.getElementById('content-inner');
	innerContent.addEventListener('DOMNodeInserted', function(e){
		if (e.relatedNode.id === 'groupContainer'){
			func();
		}
	})
}

document.addEventListener('DOMContentLoaded', newSection);
