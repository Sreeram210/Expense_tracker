  let expenses = JSON.parse(localStorage.getItem('expenses')) || []
        let position = -1

        
        function saveExpense() {
            let name = document.getElementById('name').value
            let amount = document.getElementById('amount').value
            let category = document.getElementById('category').value
            let date = document.getElementById('date').value

            if (name == '' || amount == '' || category == '' || date == '') {
                alert('Please fill all the fields')
                return
            }

            let expense = { name: name, amount: Number(amount), category: category, date: date }

            if (position == -1) {
                expenses.push(expense)       
            } else {
                expenses[position] = expense 
                position = -1
                document.getElementById('btn').innerText = 'Add Expense'
            }

            localStorage.setItem('expenses', JSON.stringify(expenses))

            document.getElementById('name').value = ''
            document.getElementById('amount').value = ''
            document.getElementById('category').value = ''
            document.getElementById('date').value = ''

            showExpenses()
        }

        function showExpenses() {
            let filter = document.getElementById('filter').value
            let rows = ''
            let total = 0

            for (let i = 0; i < expenses.length; i++) {
                if (filter == 'All' || filter == expenses[i].category) {
                    rows += '<tr>'
                    rows += '<td>' + expenses[i].name + '</td>'
                    rows += '<td>' + expenses[i].amount + '</td>'
                    rows += '<td>' + expenses[i].category + '</td>'
                    rows += '<td>' + expenses[i].date + '</td>'
                    rows += '<td>'
                    rows += '<button class="btn btn-primary btn-sm me-1" onclick="editExpense(' + i + ')">Edit</button>'
                    rows += '<button class="btn btn-danger btn-sm" onclick="deleteExpense(' + i + ')">Delete</button>'
                    rows += '</td>'
                    rows += '</tr>'
                    total += expenses[i].amount
                }
            }
            document.getElementById('list').innerHTML = rows
            document.getElementById('total').innerText = total
        }


        function editExpense(i) {
            document.getElementById('name').value = expenses[i].name
            document.getElementById('amount').value = expenses[i].amount
            document.getElementById('category').value = expenses[i].category
            document.getElementById('date').value = expenses[i].date
            document.getElementById('btn').innerText = 'Update Expense'
            position = i
        }


        function deleteExpense(i) {
            expenses.splice(i, 1)
            localStorage.setItem('expenses', JSON.stringify(expenses))
            showExpenses()
        }
        showExpenses()