class Contact < ActiveRecord::Base

  validates :first_name, :last_name, :phone_number, presence: true

end