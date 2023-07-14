# 1. realiza una transacción de 1 dolar del payment_id 10 al payment_id 16. 
select "before", payment_id, amount from payment where payment_id = 10;
select  "before", payment_id, amount from payment where payment_id = 16;
start transaction;
	update payment set amount = amount - 1 where payment_id = 10;
    update payment set amount = amount + 1 where payment_id = 16;
commit;
select "after", payment_id, amount from payment where payment_id = 10;
select  "after", payment_id, amount from payment where payment_id = 16;

# 2. realiza una transacción de 1 dolar del payment_id 16 al payment_id 10, usa rollback
# para cancelar la transacción y restaurar a los valores originales.
select "before", payment_id, amount from payment where payment_id = 16;
select  "before", payment_id, amount from payment where payment_id = 10;
start transaction;
	update payment set amount = amount - 1 where payment_id = 16;
    update payment set amount = amount + 1 where payment_id = 10;
    select "in", payment_id, amount from payment where payment_id = 16;
	select  "in", payment_id, amount from payment where payment_id = 10;
rollback;
select "after", payment_id, amount from payment where payment_id = 16;
select  "after", payment_id, amount from payment where payment_id = 10;

#3. Transferir del payment_id 4 al payment_id 27 7 dolares. (Solo si tiene fondos suficientes)

select "before", payment_id, amount from payment where payment_id=4;
select "before", payment_id, amount from payment where payment_id=27;

	start transaction;
		update payment set amount=amount -7 where payment_id=4;
        update payment set amount=amount +7 where payment_id=27;
		
        select "in", payment_id, amount from payment where payment_id=4;
        select "in", payment_id, amount from payment where payment_id=27;
    rollback;
    select "after",payment_id, amount from payment where payment_id=4;
    select "after",payment_id, amount from payment where payment_id=27;
    
    #4. Usando la base de datos sakila, crear un procedimiento almacenado para realizar transacciones en la tabla payment. 
# Debe pedir el payment_id de origen, destino, y monto a transferir. Si no hay fondos suficientes utilizar rollback.

call sakila.transferencia();