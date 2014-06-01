/*global define*/

define([
    'underscore',
    'backbone',
    'config',
    'collections/message'
], function (_, Backbone, Config, MessageCollection) {
    'use strict';

    var GoalModel = Backbone.Model.extend({
        messages: null,
        defaults: {
          accountId: '',
          category: '',
          description: '',
          textMessage: '',
          likelihood: '',
          active: true,
          created: '',
          updated: ''
        },
        initialize: function (options) {
          this.messages = new MessageCollection({
            goal: this
          });
        },
        getStatus: function () {
          var goalStatus = 'time';
          // must have at least 5 reminders to determine goal status
          if (5 < this.messages.length) {
            var i = this.messages.length;
            var numberYes = 0;
            while (i) {i--;
              var model = this.messages.at(i);
              if ('yes' == model.responseStatus()) numberYes++;
            }
            if ((numberYes/this.messages.length) > Config.okThreshold) {
              goalStatus = 'ok';
            } else {
              goalStatus = 'flag';
            }
            // determine if should return 'flag';
          }
          return goalStatus;
        },
        getStatusGlyphIcon: function() {
          return this.getStatus();
        },
        getDefaultMessages: function () {
          return [
            {id: 1, message: 'Comio vegetales ?  Recuerde la importancia de comer vegetales dos a tres veces al dia.'},
            {id: 3, message: 'Asistio a la consulta medica programada para los tres meses?  Es importante ver a  su doctor para asegurarse que todo esta bajo control.'},
            {id: 4, message: 'Camino 30 minutos?  Recuerde la importancia de mantenerse fisicamente activo 30 minutos 5 dias de la semana.'},
            {id: 5, message: 'Tomo 5 a 8 vasos de agua ?  Recuerde la importancia de beber suficiente agua para controlar sus niveles de azucar.'},
            {id: 6, message: 'Tomo soda ?  Recuerde que las bebidas azucaradas elevan de manera muy significativa sus niveles de azucar en la sangre.'},
            {id: 7, message: 'Comio comidas grasosas ?  Recuerde que las grasas no permiten que el azucar se metabolice apropiadamente.'},
            {id: 8, message: 'Fumo cigarrillos?  Recuerde que fumar cigarrillos endurece los vasos sanguineos y aumenta su riesgo de enfermar del corazon.'},
            {id: 9, message: 'Reviso sus niveles de azucar en la sangre?  Recuerde que es el unico metodo para saber si usted tiene control sobre sus niveles de azucar o no.'},
            {id: 10, message: 'Ha realizado actividades para disminuir sus niveles de stress?  Recuerde que el stress incrementa su nivel de azucar en la sangre.'},
            {id: 11, message: 'Ha tenido el  mismo horario de comidas? Recuerde la importancia de mantener un mismo horario para mejorar sus niveles de azucar en la sangre.'},
            {id: 12, message: 'Ha comido tres comidas y 2 bocadillos?  Es importante no hacer ayunos ni saltarse las comidas para controlar mejor sus niveles de azucar en la sangre.'},
            {id: 13, message: 'Han pasado mas de 4 a 5 horas sin que haya comido?  Es importante no hacer ayunos , ni saltarse las comidas para controlar mejor sus niveles de azucar en la sangre.'}
          ];
        },
        url: function() {
          if (this.isNew()) {
            return Config.api.host + '/api/goal';
          } else {
            return Config.api.host + '/api/goal/' + this.id;
          }
        }
    });

    return GoalModel;
});
