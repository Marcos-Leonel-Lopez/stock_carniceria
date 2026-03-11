<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).


## Base de Datos
SET TIME ZONE {Ubicacion};
Ej: SET TIME ZONE 'America/Argentina/Buenos_Aires';

## Funcion para registra una venta
CREATE OR REPLACE FUNCTION public.fn_procesar_venta(
    p_id_usuario integer,
    p_venta_json jsonb,
    p_id_media_res integer -- Nuevo parámetro
)
RETURNS integer AS $$
DECLARE
    v_id_venta integer;
    v_id_tipo_pago smallint;
    v_id_sesion_caja integer;
    v_total_venta numeric(10,2) := 0;
    v_item_prod record;
    v_precio_prod numeric(10,2);
    v_subtotal_prod numeric(12,2);
    v_item_promo record;
    v_precio_promo numeric(10,2);
    v_subtotal_promo numeric(12,2);
    v_desc_promo varchar(150);
	
	v_multiplicador numeric(3,2);
BEGIN
    -- Seteamos el id_media_res en la sesión para que los triggers lo usen
    PERFORM set_config('app.current_media_res_id', p_id_media_res::text, true);

    v_id_tipo_pago := (p_venta_json->>'id_tipo_pago')::smallint;
    v_id_sesion_caja := (p_venta_json->>'id_sesion_caja')::integer;

    INSERT INTO public.venta (total, fecha_venta, id_usuario, id_tipo_pago, id_sesion_caja, estado)
    VALUES (0, now(), p_id_usuario, v_id_tipo_pago, v_id_sesion_caja, 'ACTIVA')
    RETURNING id_venta INTO v_id_venta;

    -- Procesar Productos (Dispara tr_crear_movimiento_venta)
    FOR v_item_prod IN SELECT * FROM jsonb_to_recordset(p_venta_json->'productos') 
        AS x(id_producto integer, cantidad numeric(12,3))
    LOOP
        SELECT precio INTO v_precio_prod FROM public.producto WHERE id_producto = v_item_prod.id_producto;
        IF NOT FOUND THEN RAISE EXCEPTION 'Product % not found', v_item_prod.id_producto; END IF;

        v_subtotal_prod := v_precio_prod * v_item_prod.cantidad;
        INSERT INTO public.detalle_venta_producto (id_venta, id_producto, cantidad, precio_unitario_venta, subtotal)
        VALUES (v_id_venta, v_item_prod.id_producto, v_item_prod.cantidad, v_precio_prod, v_subtotal_prod);
        v_total_venta := v_total_venta + v_subtotal_prod;
    END LOOP;

    -- Procesar Promociones (Dispara tr_crear_movimiento_promocion)
    FOR v_item_promo IN SELECT * FROM jsonb_to_recordset(p_venta_json->'promociones') 
        AS x(id_promocion integer, cantidad numeric(12,3))
    LOOP
         SELECT precio_venta, nombre INTO v_precio_promo, v_desc_promo 
         FROM public.promocion WHERE id_promocion = v_item_promo.id_promocion;
         IF NOT FOUND THEN RAISE EXCEPTION 'Promotion % not found', v_item_promo.id_promocion; END IF;

         v_subtotal_promo := v_precio_promo * v_item_promo.cantidad;
         INSERT INTO public.detalle_venta_promocion (id_venta, id_promocion, cantidad, precio_total, descripcion_detalle)
         VALUES (v_id_venta, v_item_promo.id_promocion, v_item_promo.cantidad, v_subtotal_promo, v_desc_promo);
         v_total_venta := v_total_venta + v_subtotal_promo;
    END LOOP;

	SELECT multiplicador INTO v_multiplicador
	FROM public.tipo_pago WHERE id_tipo_pago = v_id_tipo_pago;
	IF NOT FOUND THEN RAISE EXCEPTION 'Payment type % not found', v_id_tipo_pago; END IF;

    UPDATE public.venta SET total = v_total_venta * v_multiplicador WHERE id_venta = v_id_venta;
    RETURN v_id_venta;

EXCEPTION
    WHEN OTHERS THEN
        -- Si el stock queda < 0, saltará aquí automáticamente por la restricción CHECK de la tabla producto
        RAISE EXCEPTION 'Sale failed: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;

### TRIGGER movimiento para producto
CREATE OR REPLACE FUNCTION fn_detalle_a_movimiento()
RETURNS TRIGGER AS $$
DECLARE
    v_id_usuario integer;
    v_id_media_res integer;
BEGIN
    SELECT id_usuario INTO v_id_usuario FROM public.venta WHERE id_venta = NEW.id_venta;
    v_id_media_res := NULLIF(current_setting('app.current_media_res_id', true), '')::integer;

    INSERT INTO public.movimiento (id_usuario, id_producto, id_tipo_movimiento, id_venta, id_media_res, cantidad)
    VALUES (v_id_usuario, NEW.id_producto, 2, NEW.id_venta, v_id_media_res, NEW.cantidad);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_crear_movimiento_venta
AFTER INSERT ON public.detalle_venta_producto
FOR EACH ROW EXECUTE FUNCTION fn_detalle_a_movimiento();

### TRIGGER actualizar stock para productos
CREATE OR REPLACE FUNCTION fn_actualizar_stock()
RETURNS TRIGGER AS $$
BEGIN
    -- Asumiendo que id_tipo_movimiento 2 es 'SALIDA'
    IF NEW.id_tipo_movimiento = 2 THEN
        UPDATE public.producto 
        SET stock = stock - NEW.cantidad,
            fecha_modificacion = now()
        WHERE id_producto = NEW.id_producto;
    ELSE
        UPDATE public.producto 
        SET stock = stock + NEW.cantidad,
            fecha_modificacion = now()
        WHERE id_producto = NEW.id_producto;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_actualizar_stock
AFTER INSERT ON public.movimiento
FOR EACH ROW EXECUTE FUNCTION fn_actualizar_stock();

### TRIGGER movimiento para promocion
CREATE OR REPLACE FUNCTION fn_promocion_a_movimiento()
RETURNS TRIGGER AS $$
DECLARE
    v_id_usuario integer;
    v_id_media_res integer;
    v_comp record;
BEGIN
    -- 1. Obtener el usuario de la venta
    SELECT id_usuario INTO v_id_usuario FROM public.venta WHERE id_venta = NEW.id_venta;
    
    -- 2. Obtener el id_media_res desde la variable de sesión (setted en la función principal)
    -- El segundo parámetro 'true' es para que no falle si la variable no está seteada
    v_id_media_res := NULLIF(current_setting('app.current_media_res_id', true), '')::integer;

    -- 3. Iterar por cada producto que compone esta promoción
    FOR v_comp IN 
        SELECT id_producto, cantidad 
        FROM public.promocion_producto 
        WHERE id_promocion = NEW.id_promocion
    LOOP
        INSERT INTO public.movimiento (
            id_usuario, 
            id_producto, 
            id_tipo_movimiento, 
            id_venta, 
            id_media_res, 
            cantidad
        )
        VALUES (
            v_id_usuario, 
            v_comp.id_producto, 
            2, -- Salida
            NEW.id_venta, 
            v_id_media_res, 
            (v_comp.cantidad * NEW.cantidad) -- Cantidad proporcional
        );
    END LOOP;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_crear_movimiento_promocion
AFTER INSERT ON public.detalle_venta_promocion
FOR EACH ROW EXECUTE FUNCTION fn_promocion_a_movimiento();
