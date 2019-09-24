$(document).ready(function(){

	let $lastClicked;

	function onTarefaDeleteClick() {
		$(this).parent('.tarefa-item')
			.off('click')
			.hide('slow', function(){
				$(this).remove();
			});
	}

	function onTarefaItemClick() {

		if(!$(this).is($lastClicked)) {

			if($lastClicked !== undefined) {
				savePendingEdition($lastClicked);	
			}
			
			$lastClicked = $(this);


			let text = $lastClicked.children('.tarefa-texto').text();

			let html = `<input type='text' class='tarefa-edit' value='${text}' />`;

			$lastClicked.html(html);

			$('.tarefa-edit').keydown(onTarefaEditKeydown);
		}
	}

	function onTarefaEditKeydown(event) {
		if(event.which === 13) {
			savePendingEdition($lastClicked);
			$lastClicked = undefined;
		}
	}

	function onTarefaKeydown() {
		if(event.which === 13) {
			addTarefa($('#tarefa').val());
			$('#tarefa').val('');
		}
	}

	function savePendingEdition($tarefa) {
		let text = $tarefa.children('.tarefa-edit').val();
		
		$tarefa.empty();

		$tarefa
			.append($('<div/>')
				.addClass('tarefa-texto')
				.text(text))
			.append($('<div/>')
				.addClass('tarefa-delete'))
			.append($('<div/>')	
				.addClass('clear'));

		$('.tarefa-delete').click(onTarefaDeleteClick);
	}

	function addTarefa(text) {
		let $tarefa =  
			$("<div />")
				.addClass("tarefa-item")
			.append($("<div />")
				.addClass("tarefa-texto")
				.text(text))
			.append($("<div />")
				.addClass("tarefa-delete"))
			.append($("<div />")
				.addClass("clear"));

		$('#tarefa-lista').append($tarefa);

		$('.tarefa-delete').click(onTarefaDeleteClick);
		$('.tarefa-item').click(onTarefaItemClick);

	}

	$('.tarefa-delete').click(onTarefaDeleteClick);
	$('.tarefa-item').click(onTarefaItemClick);
	$('#tarefa').keydown(onTarefaKeydown);
});