require 'parsers/codes/su_code_parser'
require 'cascadable'

class Top3IcdParser < SuCodeParser

  def build
    self._
        .with { |composite|
          composite.tab._
              .from(0)
              .for(self.stream)
              .in(:tab)
              .repeat
              .with { |sheet|
                sheet.column._
                    .column(2)
                    .from(8)
                    .step(16)
                    .for(self.stream)
                    .in(:hospital)
              }
              # .with { |sheet|
              #   sheet.column._
              #       .from(23)
              #       .for(self.stream)
              #       .in(:year)
              #       .transformed(:round)
              #       .distinct
              #       .repeat
              #       .with { |code|
              #         code.row._
              #             .row(code.from)
              #             .from(code.column + 1)
              #             .to(code.column + 7)
              #             .for(self.stream)
              #             .in(:code)
              #       }
              #       .with { |code|
              #         code.row._
              #             .row(code.from)
              #             .from(code.column + 8)
              #             .for(self.stream)
              #             .in(:percentile_values)
              #       }
              # }
        }
  end
end