export default function PopupExclusao({ titulo, mensagem, action, fecharModal }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-96">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{titulo}</h3>
                <hr className="my-2 border-gray-300 dark:border-gray-600" />
                <p className="text-gray-700 dark:text-gray-300">{mensagem}</p>
                <div className="flex justify-end mt-4 space-x-2">
                    <button
                        className="px-4 py-2 border rounded-lg transition 
               text-red-600 border-red-600 hover:bg-red-600 hover:text-white 
               dark:text-red-400 dark:border-red-400 dark:hover:bg-red-700 dark:hover:text-white"
                        onClick={action}
                    >
                        Confirmar
                    </button>

                    <button
                        className="px-4 py-2 border rounded-lg transition 
               text-gray-600 border-gray-400 hover:bg-gray-300 hover:text-gray-900 
               dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={fecharModal}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}
