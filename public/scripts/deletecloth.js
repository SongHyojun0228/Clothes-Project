let DeleteClothId = null;

const deleteButtons = document.querySelectorAll('.delete-btn');

const ConfirmDeleteButton = document.getElementById('confirmDeletebtn');
const CancelDeleteButton = document.getElementById('cancelDeletebtn');

deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
        openDeleteWindow(this);
    });
});

function openDeleteWindow(buttonElement) {
    DeleteClothId = buttonElement.dataset.id; 
    console.log(DeleteClothId);
    const deleteWindow = document.getElementById('deleteWindow');
    if(deleteWindow.style.display == 'block') {
        deleteWindow.style.display = 'none'
    }
    else {
        deleteWindow.style.display = 'block';
    }
}

ConfirmDeleteButton.addEventListener('click', ConfirmDelete);
CancelDeleteButton.addEventListener('click', CancelDelete);

async function ConfirmDelete() {
    if (DeleteClothId) {
        try {
            const response = await fetch(`/wishclothes/${DeleteClothId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
<<<<<<< HEAD
                // 삭제가 성공하면 해당 항목을 화면에서 제거    
=======
>>>>>>> 9f26047cecc9365b737bb42b88fc50488b1aee6b
                const deleteButton = document.querySelector(`button[data-id='${DeleteClothId}']`);
                const clothItem = deleteButton.previousElementSibling;
                deleteButton.remove();
                clothItem.remove();
                DeleteClothId = null;
                const deleteWindow = document.getElementById('deleteWindow');
                deleteWindow.style.display = 'none';
            } else {
                console.error('Failed to delete the item');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

function CancelDelete() {
    DeleteClothId = null;
    const deleteWindow = document.getElementById('deleteWindow');
    deleteWindow.style.display = 'none'
}

