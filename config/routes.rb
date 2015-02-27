Rails.application.routes.draw do

  resources :mdcs, :except => [:new, :edit, :update, :destroy, :create] do
    get :name, :on => :collection
    get :drgs, :on => :member
  end

  resources :chop_codes, :except => [:new, :edit, :update, :destroy, :create] do
    get :search, :on => :collection
    get :name, :on => :collection
  end

  resources :icd_codes, :except => [:new, :edit, :update, :destroy, :create] do
    get :search, :on => :collection
    get :name, :on => :collection
  end

  namespace :api do
    namespace :v1 do
      resources :codes, :only => [:index, :show] do
        resources :code, :only => [:index, :show]

      end
    end
  end

  resources :drgs, :except => [:new, :edit, :update, :destroy, :create] do
    get :name, :on => :collection
    get :search, :on => :collection
  end

  get 'contact', :to => 'infos#contact'
  
  root :to => 'infos#introduction'
  
  get 'set_locale', :to => 'application#set_locale'
  get 'search', :to => 'search#index'
  # See how all your routes lay out with "rake routes"
end
