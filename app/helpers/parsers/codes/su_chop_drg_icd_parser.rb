require 'parsers/codes/su_code_parser'

class SuChopDrgIcdParser < SuCodeParser

  def build
    self._
        .with { |composite|
          composite.tab._
              .from(1)
              .for(self.stream)
              .in(:tab)
              .repeat
              .with { |sheet|
                sheet.row._
                    .row(21)
                    .from(9)
                    .for(self.stream)
                    .in(:percentiles)
                    .transformed(:round)
                    .merge
              }
              .with { |sheet|
                sheet.column._
                    .from(23)
                    .for(self.stream)
                    .in(:year)
                    .transformed(:round)
                    .distinct
                    .repeat
                    .with { |code|
                      code.row._
                          .row(code.from)
                          .from(code.column + 1)
                          .to(code.column + 7)
                          .for(self.stream)
                          .in(:code)
                          .merge
                    }
                    .with { |code|
                      code.row._
                          .row(code.from)
                          .from(code.column + 8)
                          .for(self.stream)
                          .in(:percentile_values)
                          .merge
                    }
              }
        }
  end
end