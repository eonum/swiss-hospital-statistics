module Api
  module V1
    class InfoController < ApplicationController
      def index
        render json: {code: params[:code_id]}
      end

      def show

        #render ChopCode.find(params[:id]).to_json;

        render json: {
                   codes: {
                       params[:id].parameterize.underscore.to_sym => {
                           description: "Chop code is tzpe of caode that bla bla haba",
                           codes: [
                               {
                                   code: "001200",
                                   description: "Inhalation von Stickstoffmonoxyd, Dauer der Behandlung bis unter 48 Stunden",
                                   years: [
                                       {
                                           categories: [
                                               {
                                                   interval: [
                                                       {
                                                           categories: [
                                                               {
                                                                   percentile: [
                                                                       {
                                                                           amount: 14,
                                                                           percentile: 5.0
                                                                       },
                                                                       {
                                                                           amount: 14.0,
                                                                           percentile: 10.0
                                                                       },
                                                                       {
                                                                           amount: 14.0,
                                                                           percentile: 25.0
                                                                       },
                                                                       {
                                                                           amount: 14.0,
                                                                           percentile: 50.0
                                                                       },
                                                                       {
                                                                           amount: 14.0,
                                                                           percentile: 75.0
                                                                       },
                                                                       {
                                                                           amount: 14.0,
                                                                           percentile: 90.0
                                                                       },
                                                                       {
                                                                           amount: 14.0,
                                                                           percentile: 95.0
                                                                       }
                                                                   ]
                                                               }
                                                           ],
                                                           n: 1,
                                                           dad: 14.0,
                                                           interval: {
                                                               from: 0,
                                                               to: 14
                                                           },
                                                           max: 14,
                                                           min: 14,
                                                           sa: 0.0
                                                       }
                                                   ]
                                               }
                                           ],
                                           year: 2013
                                       }
                                   ]
                               }
                           ]
                       }
                   }
               }
      end
    end
  end
end