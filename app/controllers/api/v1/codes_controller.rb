module Api
  module V1
    class CodesController < ApplicationController

      include Parsers

      def index
        # put code to play with here
        # Parsers::SuDParser.new.parse
        render json: {
                   codes: {
                       chop: {
                           description: "Chop code is tzpe of caode that bla bla haba"
                       },
                       icd: {
                           description: "ICD code is tzpe of caode that bla bla haba"
                       },
                       ke: {
                           description: "KE code is tzpe of caode that bla bla haba"
                       },
                       age: {
                           description: "AGE code is tzpe of caode that bla bla haba"
                       }
                   }
               };
      end

      def show
        render json: {
                   codes: {
                       params[:id].parameterize.underscore.to_sym => {
                           description: "Chop code is tzpe of caode that bla bla haba",
                           codes: [
                               {
                                   code: "001200",
                                   description: "Inhalation von Stickstoffmonoxyd, Dauer der Behandlung bis unter 48 Stunden"
                               },
                               {
                                   code: "0033",
                                   description: "Computergesteuerte Chirurgie mit Fluoroskopie"
                               }
                           ]
                       }
                   }
               }
      end
    end
  end
end